import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Sparkles,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDemoOpportunitiesWithDetails } from '../../lib/demo-data';
import { calculateMatchScore } from '../../lib/matching';
import type { OpportunityType, WorkMode, ExperienceLevel } from '../../types';
import MatchScoreBadge from '../../components/ui/MatchScoreBadge';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import TransparencyScoreBadge from '../../components/transparency/TransparencyScoreBadge';

export const OpportunityList: React.FC = () => {
  const { profile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>(searchParams.get('type') || 'all');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('all');
  const [selectedExpLevel, setSelectedExpLevel] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'match' | 'deadline'>('newest');
  const [savedIds, setSavedIds] = useState<string[]>(['demo-opp-6']);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const rawOpportunities = useMemo(() => getDemoOpportunitiesWithDetails(), []);

  // Compute matched opportunities
  const opportunitiesWithScores = useMemo(() => {
    return rawOpportunities.map((opp) => {
      const match = profile ? calculateMatchScore(profile, opp) : null;
      return {
        ...opp,
        matchScore: match?.overall || 0,
        matchReasons: match?.reasons || [],
      };
    });
  }, [rawOpportunities, profile]);

  // Extract all unique skills across opportunities
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    rawOpportunities.forEach((opp) => opp.required_skills?.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [rawOpportunities]);

  // Filtered & Sorted Opportunities
  const filteredOpportunities = useMemo(() => {
    let result = opportunitiesWithScores.filter((opp) => {
      // Search keyword
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(term);
        const matchesDesc = opp.description.toLowerCase().includes(term);
        const matchesOrg = opp.organization?.name.toLowerCase().includes(term) || false;
        const matchesSkills = opp.required_skills.some((s) => s.toLowerCase().includes(term));
        if (!matchesTitle && !matchesDesc && !matchesOrg && !matchesSkills) return false;
      }

      // Type filter
      if (selectedType !== 'all' && opp.type !== selectedType) return false;

      // Work mode filter
      if (selectedWorkMode !== 'all' && opp.work_mode !== selectedWorkMode) return false;

      // Experience level filter
      if (
        selectedExpLevel !== 'all' &&
        opp.experience_level !== selectedExpLevel &&
        opp.experience_level !== 'any'
      )
        return false;

      // Skill filter
      if (selectedSkill !== 'all' && !opp.required_skills.includes(selectedSkill)) return false;

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'match') {
        return (b.matchScore || 0) - (a.matchScore || 0);
      }
      if (sortBy === 'deadline') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return result;
  }, [
    opportunitiesWithScores,
    searchTerm,
    selectedType,
    selectedWorkMode,
    selectedExpLevel,
    selectedSkill,
    sortBy,
  ]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getTypeBadgeVariant = (type: OpportunityType) => {
    switch (type) {
      case 'job':
        return 'info';
      case 'internship':
        return 'teal';
      case 'cofounder':
        return 'purple';
      case 'hackathon':
        return 'warning';
      case 'startup_role':
        return 'success';
      case 'freelance':
      default:
        return 'default';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-teal-500/10 to-transparent pointer-events-none" />
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Opportunity Marketplace</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Discover Your Next High-Impact Role
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            From internships and early-stage startup positions to co-founder openings and global hackathons.
            Transparent fit scoring shows you why each role is recommended.
          </p>
        </div>
      </div>

      {/* Search & Top Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by role, skills, keywords, or company..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="sm:hidden flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4 text-teal-600" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="shrink-0 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-xs"
            >
              <option value="newest">Newest Added</option>
              {profile && <option value="match">Highest Match Score</option>}
              <option value="deadline">Soonest Deadline</option>
            </select>
          </div>

          <Link
            to="/opportunities/new"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold hover:bg-navy-800 transition-all shadow-xs"
          >
            <span>Post Opportunity</span>
          </Link>
        </div>
      </div>

      {/* Main Content Layout (Filter sidebar + List) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar (Desktop) */}
        <aside
          className={`lg:block ${
            mobileFiltersOpen ? 'block' : 'hidden'
          } lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs self-start`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-teal-600" />
              <span>Filters</span>
            </h3>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedWorkMode('all');
                setSelectedExpLevel('all');
                setSelectedSkill('all');
                setSearchTerm('');
              }}
              className="text-xs text-teal-600 hover:text-teal-700 font-medium"
            >
              Reset All
            </button>
          </div>

          {/* Opportunity Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Opportunity Type
            </label>
            <div className="space-y-1.5">
              {[
                { value: 'all', label: 'All Types' },
                { value: 'job', label: 'Full-Time Job' },
                { value: 'internship', label: 'Internship' },
                { value: 'cofounder', label: 'Co-Founder' },
                { value: 'startup_role', label: 'Startup Team' },
                { value: 'hackathon', label: 'Hackathon' },
                { value: 'freelance', label: 'Freelance Project' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedType(opt.value)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedType === opt.value
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Work Mode */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Work Location
            </label>
            <div className="grid grid-cols-3 gap-1">
              {['all', 'remote', 'hybrid', 'onsite'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedWorkMode(mode)}
                  className={`py-1.5 text-center text-[11px] rounded-lg font-medium capitalize border transition-all ${
                    selectedWorkMode === mode
                      ? 'bg-navy-900 text-white border-navy-900 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Experience Level
            </label>
            <select
              value={selectedExpLevel}
              onChange={(e) => setSelectedExpLevel(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="all">Any Experience</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="lead">Lead / Principal</option>
            </select>
          </div>

          {/* Popular Skill filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Filter by Skill
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
              <button
                onClick={() => setSelectedSkill('all')}
                className={`px-2 py-0.5 text-[10px] rounded-md font-medium ${
                  selectedSkill === 'all'
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Skills
              </button>
              {allSkills.slice(0, 15).map((skill) => (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`px-2 py-0.5 text-[10px] rounded-md font-medium transition-colors ${
                    selectedSkill === skill
                      ? 'bg-teal-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Opportunity Listings Feed */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong className="text-slate-800">{filteredOpportunities.length}</strong> available
              opportunities
            </span>
            <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
              Demo Persistent Database
            </span>
          </div>

          {filteredOpportunities.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No opportunities found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No active listings match your current filter selection. Try adjusting your search keywords or
                clearing active filters.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedType('all');
                  setSelectedWorkMode('all');
                  setSelectedExpLevel('all');
                  setSelectedSkill('all');
                  setSearchTerm('');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            filteredOpportunities.map((opp) => {
              const isSaved = savedIds.includes(opp.id);
              return (
                <div
                  key={opp.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-500/40 p-6 transition-all duration-200 shadow-xs hover:shadow-md relative group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top Row: Type badge + Match score + Bookmark */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={getTypeBadgeVariant(opp.type) as any}>
                          {opp.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {opp.organization && (
                          <span className="text-xs font-semibold text-slate-700">
                            {opp.organization.name}
                          </span>
                        )}
                        {opp.work_mode && (
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md capitalize flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {opp.work_mode} {opp.location ? `• ${opp.location}` : ''}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <TransparencyScoreBadge opportunity={opp} compact={true} />
                        {profile && opp.matchScore > 0 && (
                          <MatchScoreBadge score={opp.matchScore} reasons={opp.matchReasons} />
                        )}
                        <button
                          onClick={(e) => toggleSave(opp.id, e)}
                          title={isSaved ? 'Remove Bookmark' : 'Save Opportunity'}
                          className={`p-2 rounded-xl border transition-colors ${
                            isSaved
                              ? 'bg-teal-50 text-teal-600 border-teal-200'
                              : 'text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-teal-600' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Title & Short description */}
                    <div>
                      <Link
                        to={`/opportunities/${opp.id}`}
                        className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors block"
                      >
                        {opp.title}
                      </Link>
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {opp.description}
                      </p>
                    </div>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {opp.required_skills?.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-slate-50 text-slate-700 border border-slate-200/80 rounded-md text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer details */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      {opp.compensation && (
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-teal-600" />
                          {opp.compensation}
                        </span>
                      )}
                      {opp.deadline && (
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          Apply by: {new Date(opp.deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/opportunities/${opp.id}`}
                      className="px-4 py-1.5 bg-slate-900 hover:bg-teal-600 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
                    >
                      View Details & Apply →
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityList;
