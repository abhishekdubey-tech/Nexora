import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Bookmark,
  User,
  Rocket,
  Users,
  Briefcase,
  GraduationCap,
  Calendar,
  Sparkles,
  FlaskConical,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

export const DashboardLayout: React.FC = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const role = profile?.role || 'job_seeker';

  // Role-specific navigation items
  const navItems = [
    { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
    ...(role === 'job_seeker'
      ? [
          { label: 'My Applications', to: '/dashboard/applications', icon: FileText },
          { label: 'Saved Listings', to: '/dashboard/saved', icon: Bookmark },
          { label: 'Idea Lab', to: '/lab', icon: FlaskConical },
        ]
      : []),
    ...(role === 'entrepreneur'
      ? [
          { label: 'My Startups', to: '/startups', icon: Rocket },
          { label: 'Idea Lab', to: '/lab', icon: FlaskConical },
          { label: 'Talent Discovery', to: '/talent', icon: Users },
        ]
      : []),
    ...(role === 'recruiter'
      ? [
          { label: 'Candidate Search', to: '/talent', icon: Users },
          { label: 'Post an Opening', to: '/opportunities/new', icon: Briefcase },
        ]
      : []),
    ...(role === 'mentor'
      ? [
          { label: 'Mentor Profile', to: '/mentors', icon: GraduationCap },
        ]
      : []),
    { label: 'My Profile & Skills', to: '/profile', icon: User },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-navy-900 to-teal-700 text-teal-300 font-bold text-lg flex items-center justify-center shadow-md">
                {profile?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 truncate text-sm">
                  {profile?.full_name || 'Anonymous User'}
                </h3>
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-md mt-0.5">
                  {role.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
              <p className="truncate">📍 {profile?.location || 'No location set'}</p>
              <p className="truncate">💼 {profile?.experience_level ? `${profile.experience_level} level` : 'Open'}</p>
            </div>
          </div>

          <nav className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30'
                        : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Dual Path banner */}
          <div className="bg-gradient-to-br from-navy-900 to-slate-900 rounded-2xl p-4 text-white text-xs space-y-2.5 shadow-md">
            <div className="flex items-center gap-1.5 text-teal-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Dual Career Path</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Nexora allows you to seek employment AND build your own venture concurrently.
            </p>
            <div className="pt-1 flex gap-2">
              <NavLink
                to="/opportunities"
                className="flex-1 text-center py-1.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-semibold text-slate-200"
              >
                Jobs
              </NavLink>
              <NavLink
                to="/startups/new"
                className="flex-1 text-center py-1.5 px-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 rounded-lg text-[10px] font-semibold"
              >
                Startups
              </NavLink>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Area */}
        <section className="flex-1 min-w-0">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
