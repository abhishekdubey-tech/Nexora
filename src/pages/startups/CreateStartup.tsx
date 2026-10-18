import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowLeft, CheckCircle2, Target, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/ui/Toast';
import type { StartupStage } from '../../types';
import Button from '../../components/ui/Button';

export const CreateStartup: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [industry, setIndustry] = useState('EdTech');
  const [businessModel, setBusinessModel] = useState('Freemium + Subscription');
  const [stage, setStage] = useState<StartupStage>('idea');
  const [skillsInput, setSkillsInput] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(['React Native', 'UI/UX Design']);
  const [teamSize, setTeamSize] = useState(1);
  const [fundingStatus, setFundingStatus] = useState<'bootstrapped' | 'seeking' | 'funded'>('bootstrapped');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Validation checklist flags
  const [hasProblem, setHasProblem] = useState(true);
  const [hasTargetUsers, setHasTargetUsers] = useState(true);
  const [hasSolution, setHasSolution] = useState(true);
  const [hasMarketResearch, setHasMarketResearch] = useState(false);
  const [hasPrototype, setHasPrototype] = useState(false);

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
    if (!name.trim() || !problem.trim() || !solution.trim()) {
      error('Please fill in the startup name, problem, and solution.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      success('Startup created and added to the Launchpad!');
      navigate('/startups');
    }, 600);
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
            Venture Validation
          </span>
          <h1 className="text-2xl font-black text-navy-900 mt-1">Publish a Startup Venture</h1>
          <p className="text-xs text-slate-500 mt-1">
            Attract technical co-founders, early teammates, mentors, and initial beta users on Nexora.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Tagline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Startup Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. EduBridge, HealthPulse"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Tagline / Mission</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Democratizing education through low-bandwidth tutoring"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Problem Statement */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              The Problem Being Solved <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Who experiences this pain point? Why do existing solutions fail them?..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Proposed Solution */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Your Solution & Core Value Proposition <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="How does your platform or product solve the pain point? What is the secret sauce?..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Target Audience & Business Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Rural students aged 12-18, university researchers"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Business Model</label>
              <input
                type="text"
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value)}
                placeholder="e.g. Freemium, B2B SaaS, Marketplace Commission"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Industry, Stage, Funding */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="EdTech">EdTech</option>
                <option value="HealthTech">HealthTech</option>
                <option value="FinTech">FinTech</option>
                <option value="AI / ML">AI / ML</option>
                <option value="Enterprise SaaS">Enterprise SaaS</option>
                <option value="ClimateTech">ClimateTech</option>
                <option value="Consumer Web">Consumer Web</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Current Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as StartupStage)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="idea">Idea Stage</option>
                <option value="validation">Validation</option>
                <option value="mvp">MVP Built</option>
                <option value="early_traction">Early Traction</option>
                <option value="growth">Growth</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Funding Status</label>
              <select
                value={fundingStatus}
                onChange={(e) => setFundingStatus(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="bootstrapped">Bootstrapped</option>
                <option value="seeking">Seeking Pre-Seed / Seed</option>
                <option value="funded">Angel / Seed Funded</option>
              </select>
            </div>
          </div>

          {/* Required Skills for Team */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">
              Co-Founder / Teammate Skills Needed (Press Enter)
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
                placeholder="Add skill (e.g. Flutter, PyTorch)..."
                className="bg-transparent text-xs p-1 focus:outline-none min-w-[140px] flex-1"
              />
            </div>
          </div>

          {/* Validation Checklist Interactive */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold text-navy-900 block">
              Validation Checklist (Declare your venture's current verification status)
            </span>
            <div className="space-y-2">
              {[
                { label: 'Problem identified & documented', state: hasProblem, set: setHasProblem },
                { label: 'Target users and personas defined', state: hasTargetUsers, set: setHasTargetUsers },
                { label: 'Distinct solution proposed', state: hasSolution, set: setHasSolution },
                { label: 'Market and competitive research conducted', state: hasMarketResearch, set: setHasMarketResearch },
                { label: 'Prototype or MVP planned/built', state: hasPrototype, set: setHasPrototype },
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.state}
                    onChange={(e) => item.set(e.target.checked)}
                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Honest checklists promote trust with future co-founders and investors.
            </span>
            <Button type="submit" variant="primary" loading={submitting}>
              Publish Startup to Launchpad
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStartup;
