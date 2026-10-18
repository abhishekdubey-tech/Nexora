import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket,
  Search,
  Filter,
  CheckCircle,
  Users,
  Target,
  ArrowRight,
  Sparkles,
  Layers,
  PlusCircle,
} from 'lucide-react';
import { getDemoStartupsWithDetails } from '../../lib/demo-data';
import type { StartupStage } from '../../types';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export const StartupList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const startups = useMemo(() => getDemoStartupsWithDetails(), []);

  const industries = useMemo(() => {
    const set = new Set<string>();
    startups.forEach((s) => s.industry && set.add(s.industry));
    return Array.from(set);
  }, [startups]);

  const filteredStartups = useMemo(() => {
    return startups.filter((s) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(term);
        const matchesTagline = s.tagline.toLowerCase().includes(term);
        const matchesProblem = s.problem.toLowerCase().includes(term);
        const matchesSkills = s.required_skills?.some((sk) => sk.toLowerCase().includes(term));
        if (!matchesName && !matchesTagline && !matchesProblem && !matchesSkills) return false;
      }
      if (selectedStage !== 'all' && s.stage !== selectedStage) return false;
      if (selectedIndustry !== 'all' && s.industry !== selectedIndustry) return false;
      return true;
    });
  }, [startups, searchTerm, selectedStage, selectedIndustry]);

  const getStageBadge = (stage: StartupStage) => {
    switch (stage) {
      case 'idea':
        return <Badge variant="default">Idea Stage</Badge>;
      case 'validation':
        return <Badge variant="info">Validation</Badge>;
      case 'mvp':
        return <Badge variant="teal">MVP Built</Badge>;
      case 'early_traction':
        return <Badge variant="success">Early Traction</Badge>;
      case 'growth':
        return <Badge variant="purple">Growth</Badge>;
    }
  };

  const getValidationProgress = (startup: any) => {
    let score = 0;
    if (startup.has_problem) score++;
    if (startup.has_target_users) score++;
    if (startup.has_solution) score++;
    if (startup.has_market_research) score++;
    if (startup.has_prototype) score++;
    return score;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Rocket className="w-3.5 h-3.5" />
            <span>Startup Launchpad</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Turn Startup Ideas into High-Performing Ventures
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Discover pioneering projects, connect with mission-driven founders, find technical co-founders,
            and inspect honest problem validation checklists.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/startups/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Launch & Validate Your Startup
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search startups by name, industry, problem, or skills..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Stages</option>
            <option value="idea">Idea</option>
            <option value="validation">Validation</option>
            <option value="mvp">MVP</option>
            <option value="early_traction">Early Traction</option>
            <option value="growth">Growth</option>
          </select>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="all">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Startup Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.map((startup) => {
          const valScore = getValidationProgress(startup);
          return (
            <div
              key={startup.id}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-teal-500/40 p-6 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-lg group"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  {getStageBadge(startup.stage)}
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                    {startup.industry}
                  </span>
                </div>

                {/* Name & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-navy-900 group-hover:text-teal-600 transition-colors">
                    {startup.name}
                  </h3>
                  <p className="text-xs font-medium text-teal-700 mt-1 line-clamp-1">{startup.tagline}</p>
                </div>

                {/* Problem snippet */}
                <div className="text-xs text-slate-600 space-y-1 bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                  <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block">
                    Problem Addressed:
                  </span>
                  <p className="line-clamp-2 leading-relaxed">{startup.problem}</p>
                </div>

                {/* Looking for skills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Seeking Collaborators in:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {startup.required_skills?.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Validation checklist status */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Validation Checklist</span>
                    <span>{valScore}/5 Completed</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-teal-500 h-1.5 rounded-full"
                      style={{ width: `${(valScore / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Founder & CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-[10px] text-slate-400 block font-medium">Founder</span>
                  <span className="font-bold text-slate-800">{startup.founder?.full_name || 'Founder'}</span>
                </div>

                <Link
                  to={`/startups/${startup.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-navy-900 hover:bg-teal-600 text-white text-xs font-semibold transition-colors"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StartupList;
