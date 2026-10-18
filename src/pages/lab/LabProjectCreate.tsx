import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FlaskConical, ArrowLeft, Plus, X, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { saveLabProject } from '../../lib/lab-demo-data';
import type { StartupProject } from '../../types';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

const INDUSTRY_OPTIONS = [
  'EdTech', 'HealthTech', 'FinTech', 'CleanTech', 'AgriTech',
  'Retail / E-Commerce', 'Enterprise SaaS', 'Consumer App',
  'Marketplace', 'Social Impact', 'AI / ML', 'Other'
];

const BUSINESS_MODELS = [
  'Subscription (SaaS)',
  'Marketplace (commission)',
  'Freemium',
  'Advertising',
  'B2B / Enterprise licensing',
  'Transaction fees',
  'Services / Consulting',
  'Other / Not decided yet'
];

export const LabProjectCreate: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { success } = useToast();

  const [form, setForm] = useState({
    name: '',
    description: '',
    problem_statement: '',
    proposed_solution: '',
    target_customers: '',
    industry: 'EdTech',
    business_model: 'Subscription (SaaS)',
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Project name is required';
    if (!form.problem_statement.trim()) e.problem_statement = 'Problem statement is required';
    if (!form.proposed_solution.trim()) e.proposed_solution = 'Proposed solution is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills((prev) => [...prev, s]);
    }
    setSkillInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;
    setSaving(true);
    const id = `lab-${Date.now()}`;
    const now = new Date().toISOString();
    const project: StartupProject = {
      id,
      owner_id: user.id,
      name: form.name.trim(),
      description: form.description.trim(),
      problem_statement: form.problem_statement.trim(),
      proposed_solution: form.proposed_solution.trim(),
      target_customers: form.target_customers.trim(),
      industry: form.industry,
      business_model: form.business_model,
      required_team_skills: skills,
      current_stage: 1,
      created_at: now,
      updated_at: now,
      stage1: {
        problem_definition: form.problem_statement.trim(),
        affected_people: form.target_customers.trim(),
        existing_alternatives: '',
        assumptions: '',
        status: 'in_progress',
        completion_note: '',
        evidence_links: [],
      },
    };
    saveLabProject(project);
    success('Project created! Welcome to Stage 1: Problem Discovery.');
    navigate(`/lab/${id}`);
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500 text-sm">
          Please <Link to="/auth/login" className="text-teal-600 font-semibold underline">sign in</Link> to start a lab project.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/lab" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-navy-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Lab Overview
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-navy-900 flex items-center justify-center text-white shadow-sm">
          <FlaskConical className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Initiate Startup Lab Project</h1>
          <p className="text-slate-500 text-xs">Define your core premise. You will refine and validate it through structured milestones.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Venture Overview</h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. EduBridge, MedTrack, TaskSync..."
              className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.name ? 'border-rose-400 bg-rose-50' : 'border-slate-200'} text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500`}
            />
            {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Executive Summary</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="A brief overview of your business premise..."
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Industry Domain</label>
              <select
                value={form.industry}
                onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 bg-white"
              >
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Business Model</label>
              <select
                value={form.business_model}
                onChange={(e) => setForm((f) => ({ ...f, business_model: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 bg-white"
              >
                {BUSINESS_MODELS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Hypothesis & Customer Focus</h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Problem Statement *</label>
            <p className="text-[11px] text-slate-400 mb-2">What exact pain point, friction, or unmet demand are you solving?</p>
            <textarea
              value={form.problem_statement}
              onChange={(e) => setForm((f) => ({ ...f, problem_statement: e.target.value }))}
              placeholder="State the problem clearly from the customer's point of view..."
              rows={3}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.problem_statement ? 'border-rose-400 bg-rose-50' : 'border-slate-200'} text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 resize-none`}
            />
            {errors.problem_statement && <p className="text-[11px] text-rose-500 mt-1">{errors.problem_statement}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Proposed Solution *</label>
            <p className="text-[11px] text-slate-400 mb-2">How will your product or service eliminate this friction?</p>
            <textarea
              value={form.proposed_solution}
              onChange={(e) => setForm((f) => ({ ...f, proposed_solution: e.target.value }))}
              placeholder="Describe your intended solution approach..."
              rows={3}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${errors.proposed_solution ? 'border-rose-400 bg-rose-50' : 'border-slate-200'} text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 resize-none`}
            />
            {errors.proposed_solution && <p className="text-[11px] text-rose-500 mt-1">{errors.proposed_solution}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Audience / Early Adopters</label>
            <input
              type="text"
              value={form.target_customers}
              onChange={(e) => setForm((f) => ({ ...f, target_customers: e.target.value }))}
              placeholder="e.g. University graduates searching for first internships in Tier-2 hubs"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <h2 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Required Team Skills</h2>
          <p className="text-[11px] text-slate-400">Add skill sets you are seeking in collaborators or co-founders:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="e.g. React Native, Machine Learning, UI/UX..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
            />
            <Button type="button" variant="secondary" onClick={addSkill}>
              <Plus className="w-4 h-4" /> Add Skill
            </Button>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200/60 rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => setSkills((s) => s.filter((x) => x !== skill))}
                    className="text-teal-400 hover:text-teal-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="secondary" onClick={() => navigate('/lab')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={saving}>
            <Save className="w-4 h-4 mr-1.5" /> Initialize Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LabProjectCreate;
