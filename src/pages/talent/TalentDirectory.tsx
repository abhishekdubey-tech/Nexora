import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Briefcase, Globe, Github, Linkedin, ShieldCheck, Mail } from 'lucide-react';
import { demoProfiles } from '../../lib/demo-data';
import type { UserRole } from '../../types';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export const TalentDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const { info } = useToast();

  const publicProfiles = useMemo(() => {
    return demoProfiles.filter((p) => p.is_public);
  }, []);

  const allSkills = useMemo(() => {
    const set = new Set<string>();
    publicProfiles.forEach((p) => p.skills.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [publicProfiles]);

  const filtered = useMemo(() => {
    return publicProfiles.filter((p) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesName = p.full_name.toLowerCase().includes(term);
        const matchesHeadline = p.headline.toLowerCase().includes(term);
        const matchesBio = p.bio.toLowerCase().includes(term);
        const matchesSkills = p.skills.some((s) => s.toLowerCase().includes(term));
        if (!matchesName && !matchesHeadline && !matchesBio && !matchesSkills) return false;
      }
      if (selectedRole !== 'all' && p.role !== selectedRole) return false;
      if (selectedSkill !== 'all' && !p.skills.includes(selectedSkill)) return false;
      return true;
    });
  }, [publicProfiles, searchTerm, selectedRole, selectedSkill]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Talent Directory & Candidate Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Discover Verified Candidates & Potential Co-Founders
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Search talent by verified technical skills, career interests, and availability. Direct connection
          fosters transparent hiring and rapid startup team assembly.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidates by name, skills (e.g. React), or headline..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700"
          >
            <option value="all">All Roles</option>
            <option value="job_seeker">Job Seekers & Students</option>
            <option value="entrepreneur">Founders</option>
            <option value="mentor">Mentors</option>
            <option value="recruiter">Recruiters</option>
          </select>

          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700"
          >
            <option value="all">All Skills</option>
            {allSkills.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-3xl border border-slate-200/90 hover:border-teal-500/40 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-navy-900 to-teal-700 text-teal-300 font-bold flex items-center justify-center text-lg shadow-sm">
                    {candidate.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-navy-900 flex items-center gap-1.5">
                      <span>{candidate.full_name}</span>
                      {candidate.email_verified && (
                        <span title="Verified Member">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                        </span>
                      )}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                      {candidate.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400 capitalize bg-slate-100 px-2 py-0.5 rounded-md">
                  {candidate.work_preference}
                </span>
              </div>

              <p className="text-xs font-medium text-slate-700 leading-snug line-clamp-2">
                {candidate.headline}
              </p>

              <div className="space-y-1 text-xs text-slate-500">
                <p className="truncate">📍 {candidate.location}</p>
                <p className="truncate">🎓 {candidate.education}</p>
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {candidate.skills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 5 && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    +{candidate.skills.length - 5}
                  </span>
                )}
              </div>
            </div>

            {/* Links and action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                {candidate.github_url && (
                  <a
                    href={candidate.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-navy-900"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {candidate.linkedin_url && (
                  <a
                    href={candidate.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-600"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {candidate.portfolio_url && (
                  <a
                    href={candidate.portfolio_url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-teal-600"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  info(`Direct message initiated with ${candidate.full_name} (Sample conversation channel)`)
                }
              >
                Connect
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentDirectory;
