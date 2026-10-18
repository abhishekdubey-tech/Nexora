import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Rocket,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  Users,
  Compass,
  FileText,
  Target,
  Trophy,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  demoOpportunities,
  demoApplications,
  demoSavedOpportunities,
  demoStartups,
  demoMentors,
} from '../../lib/demo-data';
import { rankOpportunities } from '../../lib/matching';
import MatchScoreBadge from '../../components/ui/MatchScoreBadge';
import Badge from '../../components/ui/Badge';

export const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();

  const role = profile?.role || 'job_seeker';

  // 1. Matched opportunities for job seeker
  const recommendedOpportunities = useMemo(() => {
    if (!profile) return [];
    return rankOpportunities(profile, demoOpportunities).slice(0, 3);
  }, [profile]);

  // 2. User applications
  const userApplications = useMemo(() => {
    return demoApplications.filter(
      (app) => app.applicant_id === user?.id || user?.id === 'demo-user-1'
    );
  }, [user]);

  // 3. User saved items
  const userSaved = useMemo(() => {
    return demoSavedOpportunities.slice(0, 2);
  }, []);

  // 4. Entrepreneur's startups
  const userStartups = useMemo(() => {
    return demoStartups.filter(
      (s) => s.founder_id === user?.id || (role === 'entrepreneur' && s.founder_id === 'demo-user-3')
    );
  }, [user, role]);

  // Career Tracker progress
  const profilePercent = useMemo(() => {
    if (!profile) return 40;
    let score = 30;
    if (profile.skills?.length) score += 20;
    if (profile.bio) score += 15;
    if (profile.headline) score += 15;
    if (profile.portfolio_url || profile.github_url) score += 20;
    return Math.min(score, 100);
  }, [profile]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
            Executive Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Member'}! 👋
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {role === 'job_seeker' &&
              'Your profile is synced with active marketplace openings. Review your match scores and status below.'}
            {role === 'entrepreneur' &&
              'Manage your startup listings, review team collaboration proposals, and request mentorship sessions.'}
            {role === 'recruiter' &&
              'Monitor applicants across your active job postings and search the verified talent directory.'}
            {role === 'mentor' &&
              'Guide ambitious founders and students. Manage your incoming session requests and expertise profile.'}
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Profile Strength</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-navy-900">{profilePercent}%</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${profilePercent}%` }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">
              {role === 'job_seeker' ? 'Applications' : 'Active Postings'}
            </span>
            <FileText className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-navy-900">
            {role === 'job_seeker' ? userApplications.length : '3'}
          </div>
          <span className="text-[10px] text-teal-600 font-semibold block">Active in cycle</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">
              {role === 'entrepreneur' ? 'Startups' : 'Saved Roles'}
            </span>
            <Bookmark className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-navy-900">
            {role === 'entrepreneur' ? userStartups.length : userSaved.length}
          </div>
          <span className="text-[10px] text-purple-600 font-semibold block">Bookmarked for later</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Connections</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-navy-900">12</div>
          <span className="text-[10px] text-emerald-600 font-semibold block">In Nexora network</span>
        </div>
      </div>

      {/* Role-Specific Sections */}
      {role === 'job_seeker' && (
        <div className="space-y-8">
          {/* Top Recommendations by Transparent Fit Score */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-navy-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Top Recommended Opportunities for You
                </h2>
                <p className="text-xs text-slate-500">
                  Ranked by transparent skills and interest overlap with your profile.
                </p>
              </div>
              <Link
                to="/opportunities"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-teal-500/40 transition-all flex flex-col justify-between shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="teal">{opp.type.toUpperCase()}</Badge>
                      <MatchScoreBadge score={opp.match_score} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-navy-900 line-clamp-1">{opp.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{opp.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {opp.required_skills?.slice(0, 3).map((sk) => (
                        <span key={sk} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">{opp.compensation || 'Open'}</span>
                    <Link
                      to={`/opportunities/${opp.id}`}
                      className="text-teal-600 font-bold hover:underline"
                    >
                      Apply →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Applications Tracker */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-navy-900">Your Submitted Applications</h2>
              <Link
                to="/dashboard/applications"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <span>All applications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs divide-y divide-slate-100">
              {userApplications.map((app) => (
                <div key={app.id} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-xs text-navy-900">
                      {app.opportunity_id === 'demo-opp-1'
                        ? 'Frontend Engineer (React/TypeScript)'
                        : 'Portfolio Freelance Contract'}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Applied on: {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 capitalize">
                      {app.status}
                    </span>
                    <Link
                      to={`/opportunities/${app.opportunity_id}`}
                      className="text-xs text-slate-500 hover:text-navy-900"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Entrepreneur / Founder View */}
      {role === 'entrepreneur' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-navy-900">Your Venture Projects</h2>
            <Link
              to="/startups/new"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>+ New Startup</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userStartups.map((st) => (
              <div key={st.id} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="teal">{st.stage.toUpperCase()}</Badge>
                  <span className="text-xs text-slate-400">{st.industry}</span>
                </div>
                <h3 className="font-bold text-navy-900 text-sm">{st.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{st.tagline}</p>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-teal-600 font-semibold">{st.team_size} active team</span>
                  <Link to={`/startups/${st.id}`} className="font-bold text-navy-900 hover:text-teal-600">
                    Manage →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recruiter / Mentor Views */}
      {(role === 'recruiter' || role === 'mentor') && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-navy-900">
            {role === 'recruiter' ? 'Active Listings & Candidates' : 'Mentorship Management'}
          </h2>
          <p className="text-xs text-slate-600">
            {role === 'recruiter'
              ? 'Find candidates by filtering through verified skills and interests in the Talent Directory.'
              : 'Set your session schedule, accept mentee questions, and track ongoing progress.'}
          </p>
          <div className="pt-2 flex gap-3">
            <Link
              to={role === 'recruiter' ? '/talent' : '/mentors'}
              className="px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold hover:bg-navy-800"
            >
              {role === 'recruiter' ? 'Explore Candidates' : 'View Mentorship Feed'}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
