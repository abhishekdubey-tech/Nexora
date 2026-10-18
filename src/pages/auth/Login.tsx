import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Sparkles,
  Users,
  Briefcase,
  Palette,
  Rocket,
  Building2,
  GraduationCap,
} from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    id: 'demo-user-1',
    label: 'Login as Student (Aisha)',
    icon: Briefcase,
    color: 'bg-teal-500/10 text-teal-400 border-teal-500/30 hover:bg-teal-500/20',
  },
  {
    id: 'demo-user-2',
    label: 'Login as Designer (Marcus)',
    icon: Palette,
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20',
  },
  {
    id: 'demo-user-3',
    label: 'Login as Founder (Priya)',
    icon: Rocket,
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20',
  },
  {
    id: 'demo-user-4',
    label: 'Login as Recruiter (David)',
    icon: Building2,
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20',
  },
  {
    id: 'demo-user-5',
    label: 'Login as Mentor (Dr. Sarah)',
    icon: GraduationCap,
    color: 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20',
  },
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, signIn, demoLogin, isDemoMode } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(email, password);
      if (result?.error) {
        setError(result.error);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoId: string) => {
    setError('');
    setDemoLoading(demoId);
    try {
      await demoLogin(demoId);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Demo login failed.');
    } finally {
      setDemoLoading(null);
    }
  };

  const handleForgotPassword = () => {
    setError('');
    // Show a simple inline message (toast-like)
    setError('Password reset is not available in this version.');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left branding panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden items-center justify-center p-12">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-lg text-center">
          {/* Logo / Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/25">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Nexora
            </h1>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Your gateway to opportunities. Connect, grow, and build your career
            with a community that cares.
          </p>

          {/* Feature highlights */}
          <div className="space-y-4 text-left">
            {[
              { icon: Briefcase, text: 'Discover jobs, grants & hackathons' },
              { icon: Users, text: 'Connect with mentors & collaborators' },
              { icon: Rocket, text: 'Showcase skills & build your portfolio' },
            ].map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 backdrop-blur-sm border border-white/10"
              >
                <div className="w-9 h-9 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-slate-200">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Nexora</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back
            </h2>
            <p className="text-slate-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-slate-400 text-sm">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
            >
              Sign Up
            </Link>
          </p>

          {/* Demo accounts section */}
          {isDemoMode && (
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                  Try Demo Accounts
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Explore Nexora instantly with a pre-configured demo account.
              </p>
              <div className="space-y-2.5">
                {DEMO_ACCOUNTS.map((account) => {
                  const Icon = account.icon;
                  const isLoading = demoLoading === account.id;
                  return (
                    <button
                      key={account.id}
                      onClick={() => handleDemoLogin(account.id)}
                      disabled={demoLoading !== null}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${account.color}`}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                      <span>{account.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
