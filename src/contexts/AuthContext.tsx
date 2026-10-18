import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isDemoMode } from '../lib/supabase';
import { demoProfiles } from '../lib/demo-data';
import type { Profile, UserRole } from '../types';

interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  isDemoMode: boolean;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: string }>;
  demoLogin: (profileId: string) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Local storage keys for demo mode persistence
const DEMO_USER_KEY = 'nexora_demo_user';
const DEMO_PROFILES_KEY = 'nexora_demo_profiles';

function loadDemoProfiles(): Profile[] {
  try {
    const stored = localStorage.getItem(DEMO_PROFILES_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [...demoProfiles];
}

function saveDemoProfiles(profiles: Profile[]) {
  localStorage.setItem(DEMO_PROFILES_KEY, JSON.stringify(profiles));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load initial state
  useEffect(() => {
    if (isDemoMode) {
      // Demo mode: check localStorage for saved session
      const savedUserId = localStorage.getItem(DEMO_USER_KEY);
      if (savedUserId) {
        const profiles = loadDemoProfiles();
        const savedProfile = profiles.find(p => p.id === savedUserId);
        if (savedProfile) {
          setUser({ id: savedProfile.id, email: `${savedProfile.full_name.toLowerCase().replace(/\s+/g, '.')}@demo.nexora.app` });
          setProfile(savedProfile);
        }
      }
      setLoading(false);
    } else {
      // Supabase mode
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || '' });
          fetchProfile(session.user.id);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || '' });
          fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error && data) {
      setProfile(data as unknown as Profile);
    }
  };

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    if (isDemoMode) {
      const profiles = loadDemoProfiles();
      const p = profiles.find(pr => pr.id === user.id);
      if (p) setProfile(p);
    } else {
      await fetchProfile(user.id);
    }
  }, [user]);

  const signUp = async (email: string, password: string, fullName: string, role: UserRole): Promise<{ error?: string }> => {
    if (isDemoMode) {
      // Demo mode: create a local profile
      const newId = `demo-user-${Date.now()}`;
      const newProfile: Profile = {
        id: newId,
        full_name: fullName,
        role,
        headline: '',
        bio: '',
        location: '',
        education: '',
        experience: '',
        skills: [],
        interests: [],
        career_goals: '',
        work_preference: 'remote',
        experience_level: 'entry',
        portfolio_url: '',
        linkedin_url: '',
        github_url: '',
        avatar_url: '',
        is_public: true,
        email_verified: false,
        profile_completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const profiles = loadDemoProfiles();
      profiles.push(newProfile);
      saveDemoProfiles(profiles);
      
      setUser({ id: newId, email });
      setProfile(newProfile);
      localStorage.setItem(DEMO_USER_KEY, newId);
      
      return {};
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });

    if (error) return { error: error.message };
    
    if (data.user) {
      // Update the profile with role and name
      await (supabase.from('profiles') as any).update({
        full_name: fullName,
        role,
      }).eq('id', data.user.id);
    }

    return {};
  };

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    if (isDemoMode) {
      return { error: 'In demo mode, please use "Try Demo Account" buttons to log in.' };
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  };

  const signOut = async () => {
    if (isDemoMode) {
      localStorage.removeItem(DEMO_USER_KEY);
      setUser(null);
      setProfile(null);
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<{ error?: string }> => {
    if (!user) return { error: 'Not authenticated' };

    if (isDemoMode) {
      const profiles = loadDemoProfiles();
      const idx = profiles.findIndex(p => p.id === user.id);
      if (idx === -1) return { error: 'Profile not found' };
      
      profiles[idx] = { ...profiles[idx], ...updates, updated_at: new Date().toISOString() };
      saveDemoProfiles(profiles);
      setProfile(profiles[idx]);
      return {};
    }

    const { error } = await (supabase
      .from('profiles') as any)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (error) return { error: error.message };
    
    await refreshProfile();
    return {};
  };

  const demoLogin = (profileId: string) => {
    const profiles = loadDemoProfiles();
    const p = profiles.find(pr => pr.id === profileId);
    if (p) {
      const email = `${p.full_name.toLowerCase().replace(/\s+/g, '.')}@demo.nexora.app`;
      setUser({ id: p.id, email });
      setProfile(p);
      localStorage.setItem(DEMO_USER_KEY, p.id);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      isDemoMode,
      signUp,
      signIn,
      signOut,
      updateProfile,
      demoLogin,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
