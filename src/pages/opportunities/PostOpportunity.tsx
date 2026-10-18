import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/ui/Toast';
import type { OpportunityType, WorkMode, ExperienceLevel, CompensationType } from '../../types';
import Button from '../../components/ui/Button';

export const PostOpportunity: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<OpportunityType>('job');
  const [description, setDescription] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(['React', 'TypeScript']);
  const [workMode, setWorkMode] = useState<WorkMode>('remote');
  const [location, setLocation] = useState('Remote (Worldwide)');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('entry');
  const [compensation, setCompensation] = useState('$80,000 - $100,000 / yr');
  const [compensationType, setCompensationType] = useState<CompensationType>('paid');
  const [deadline, setDeadline] = useState('2026-11-30');
  const [submitting, setSubmitting] = useState(false);

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = skillsInput.trim().replace(/^,|,$/g, '');
      if (trimmed && !skillsList.includes(trimmed)) {
        setSkillsList([...skillsList, trimmed]);
        setSkillsInput('');
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      error('Please provide a title and detailed description.');
      return;
    }
    if (skillsList.length === 0) {
      error('Please add at least one required skill.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      success('Opportunity published successfully! It is now live in the marketplace.');
      navigate('/opportunities');
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-teal-600 block">
            Ecosystem Publication
          </span>
          <h1 className="text-2xl font-black text-navy-900 mt-1">Publish an Opportunity</h1>
          <p className="text-xs text-slate-500 mt-1">
            Connect directly with verified students, developers, founders, and specialized talent across Nexora.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Opportunity Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Founding Frontend Engineer, Summer UX Research Intern..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as OpportunityType)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="job">Full-Time Job</option>
                <option value="internship">Internship</option>
                <option value="cofounder">Co-Founder Opening</option>
                <option value="startup_role">Startup Team Member</option>
                <option value="hackathon">Hackathon / Challenge</option>
                <option value="freelance">Freelance Contract</option>
              </select>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Role Scope & Requirements <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline what the candidate or collaborator will build, key objectives, responsibilities, and culture..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Required Skills */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">
              Required Skills (Type and press Enter) <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
              {skillsList.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-white text-navy-900 border border-slate-200 shadow-2xs font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-slate-400 hover:text-rose-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Add skill (e.g. Python, Figma)..."
                className="bg-transparent text-xs p-1 focus:outline-none min-w-[140px] flex-1"
              />
            </div>
          </div>

          {/* Work Mode & Compensation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Work Mode</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-Site</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead</option>
                <option value="any">Any Experience</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Application Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Compensation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Compensation Model</label>
              <select
                value={compensationType}
                onChange={(e) => setCompensationType(e.target.value as CompensationType)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="paid">Paid Salary / Rate</option>
                <option value="equity">Equity Only (Co-Founder / Venture)</option>
                <option value="stipend">Monthly Stipend</option>
                <option value="unpaid">Unpaid / Volunteer</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Compensation Figures</label>
              <input
                type="text"
                value={compensation}
                onChange={(e) => setCompensation(e.target.value)}
                placeholder="e.g. $80k - $100k or 15-20% Equity"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Opportunity will be indexed in real-time for automated matching scores.
            </span>
            <Button type="submit" variant="primary" loading={submitting}>
              Publish Listing Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostOpportunity;
