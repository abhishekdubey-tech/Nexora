import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Search, CheckCircle, Clock, Star, ArrowRight, Calendar } from 'lucide-react';
import { getDemoMentorsWithDetails } from '../../lib/demo-data';
import Badge from '../../components/ui/Badge';

export const MentorList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');

  const mentors = useMemo(() => getDemoMentorsWithDetails(), []);

  const allExpertise = useMemo(() => {
    const set = new Set<string>();
    mentors.forEach((m) => m.expertise.forEach((e) => set.add(e)));
    return Array.from(set);
  }, [mentors]);

  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesName = m.profile?.full_name?.toLowerCase().includes(term);
        const matchesHeadline = m.profile?.headline?.toLowerCase().includes(term);
        const matchesBio = m.bio?.toLowerCase().includes(term);
        const matchesExp = m.expertise.some((e) => e.toLowerCase().includes(term));
        if (!matchesName && !matchesHeadline && !matchesBio && !matchesExp) return false;
      }
      if (selectedExpertise !== 'all' && !m.expertise.includes(selectedExpertise)) return false;
      return true;
    });
  }, [mentors, searchTerm, selectedExpertise]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Mentor Connect</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Accelerate Your Growth with Experienced Mentors
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Book 1-on-1 strategy sessions with seasoned founders, technical architects, and hiring managers
          committed to empowering the next generation.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by mentor name, domain, technical expertise..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-xs"
          />
        </div>

        <select
          value={selectedExpertise}
          onChange={(e) => setSelectedExpertise(e.target.value)}
          className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700"
        >
          <option value="all">All Disciplines</option>
          {allExpertise.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-3xl border border-slate-200/90 hover:border-teal-500/40 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-navy-900 to-teal-700 text-teal-300 font-bold flex items-center justify-center text-xl shadow-md">
                    {mentor.profile?.full_name?.charAt(0) || 'M'}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-navy-900">
                      {mentor.profile?.full_name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-tight mt-0.5">
                      {mentor.profile?.headline}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    mentor.availability === 'available'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {mentor.availability}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{mentor.bio}</p>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Core Expertise:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {mentor.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="text-[11px] bg-slate-50 border border-slate-200/80 text-slate-700 px-2.5 py-0.5 rounded-md font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                ⭐ {mentor.experience_years} Years Industry Experience
              </span>
              <Link
                to={`/mentors/${mentor.id}`}
                className="px-4 py-2 bg-navy-900 hover:bg-teal-600 text-white rounded-xl font-semibold transition-colors"
              >
                Request Session →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorList;
