import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FlaskConical,
  CheckCircle2,
  Circle,
  Loader2,
  Plus,
  X,
  Save,
  Lightbulb,
  Users,
  Code2,
  Rocket,
  TrendingUp,
  ExternalLink,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  getDemoLabProjectById,
  saveLabProject,
  getNextAction,
  getStageProgress,
  getOverallProgress,
} from '../../lib/lab-demo-data';
import type {
  StartupProject,
  ProblemDiscoveryData,
  CustomerValidationData,
  CustomerInterview,
  PrototypeDevelopmentData,
  PilotTestingData,
  PilotActivity,
  TractionGrowthData,
  MilestoneStatus,
} from '../../types';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

const STAGES = [
  { num: 1, label: 'Problem Discovery', icon: Lightbulb },
  { num: 2, label: 'Customer Validation', icon: Users },
  { num: 3, label: 'Prototype Development', icon: Code2 },
  { num: 4, label: 'Pilot Testing', icon: Rocket },
  { num: 5, label: 'Traction & Growth', icon: TrendingUp },
];

function EvidenceLinks({
  links,
  onChange,
}: {
  links: string[];
  onChange: (l: string[]) => void;
}) {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim();
    if (v && !links.includes(v)) onChange([...links, v]);
    setInput('');
  };
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
        Evidence / Resource Links
      </label>
      <div className="flex gap-2">
        <input
          type="url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder="https://drive.google.com/... or Figma / Notion URL"
          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-700"
        >
          Attach Link
        </button>
      </div>
      {links.map((l, i) => (
        <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <ExternalLink className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <a
            href={l}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-teal-600 hover:underline truncate flex-1"
          >
            {l}
          </a>
          <button
            type="button"
            onClick={() => onChange(links.filter((_, j) => j !== i))}
            className="text-slate-400 hover:text-rose-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

function TextAreaField({
  label,
  hint,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
      {hint && <p className="text-[11px] text-slate-400 mb-1.5">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 resize-none"
      />
    </div>
  );
}

// Stage 1
function Stage1Form({
  data,
  onChange,
}: {
  data: Partial<ProblemDiscoveryData>;
  onChange: (d: Partial<ProblemDiscoveryData>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50/70 border border-blue-200/60 rounded-xl p-4">
        <p className="text-xs text-blue-900 font-bold mb-0.5">Stage 1: Problem Discovery & Scope</p>
        <p className="text-xs text-blue-700 leading-relaxed">
          Ground your startup in verifiable friction. Document who suffers from this problem and evaluate existing alternatives.
        </p>
      </div>
      <TextAreaField
        label="Problem Definition"
        hint="Describe the core problem without mentioning your solution yet."
        value={data.problem_definition || ''}
        onChange={(v) => onChange({ ...data, problem_definition: v })}
        rows={3}
        placeholder="What is broken, slow, expensive, or inaccessible?"
      />
      <TextAreaField
        label="Target Group Experiencing the Problem"
        hint="Identify the specific audience or demographics affected."
        value={data.affected_people || ''}
        onChange={(v) => onChange({ ...data, affected_people: v })}
        rows={2}
        placeholder="Who encounters this challenge on a recurring basis?"
      />
      <TextAreaField
        label="Existing Workarounds / Competitors"
        hint="How do people cope with or solve this problem currently?"
        value={data.existing_alternatives || ''}
        onChange={(v) => onChange({ ...data, existing_alternatives: v })}
        rows={3}
        placeholder="List current platforms, manual methods, or partial competitors..."
      />
      <TextAreaField
        label="Key Hypotheses to Test"
        hint="What assumptions must be validated before writing code or investing capital?"
        value={data.assumptions || ''}
        onChange={(v) => onChange({ ...data, assumptions: v })}
        rows={3}
        placeholder="e.g. 1. Users will trust a peer tutor. 2. Budget threshold is $15/hr..."
      />
      <EvidenceLinks
        links={data.evidence_links || []}
        onChange={(l) => onChange({ ...data, evidence_links: l })}
      />
      <TextAreaField
        label="Milestone Completion Summary"
        hint="Summarize discoveries and conclusions to finish this stage."
        value={data.completion_note || ''}
        onChange={(v) => onChange({ ...data, completion_note: v })}
        rows={2}
        placeholder="Key synthesis from Problem Discovery..."
      />
    </div>
  );
}

// Stage 2
function Stage2Form({
  data,
  onChange,
}: {
  data: Partial<CustomerValidationData>;
  onChange: (d: Partial<CustomerValidationData>) => void;
}) {
  const [newInterview, setNewInterview] = useState({
    customer_name: '',
    date: '',
    key_insights: '',
    pain_points: '',
  });
  const interviews = data.interviews || [];

  const addInterview = () => {
    if (!newInterview.customer_name.trim()) return;
    const interview: CustomerInterview = {
      id: `int-${Date.now()}`,
      ...newInterview,
    };
    const updated = [...interviews, interview];
    onChange({ ...data, interviews: updated, total_interviews: updated.length });
    setNewInterview({ customer_name: '', date: '', key_insights: '', pain_points: '' });
  };

  return (
    <div className="space-y-4">
      <div className="bg-purple-50/70 border border-purple-200/60 rounded-xl p-4">
        <p className="text-xs text-purple-900 font-bold mb-0.5">Stage 2: Customer Validation</p>
        <p className="text-xs text-purple-700 leading-relaxed">
          Conduct discovery interviews with prospective customers. Record recurring pain points and iterate on your initial idea.
        </p>
      </div>

      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200/40">
        <MessageSquare className="w-5 h-5 text-purple-600 shrink-0" />
        <div>
          <p className="text-xs font-bold text-slate-800">{interviews.length} Customer Interviews Logged</p>
          <p className="text-[11px] text-slate-500">
            {interviews.length < 5
              ? `Conduct ${5 - interviews.length} more interviews to spot strong recurring demand patterns.`
              : 'Target achieved! Synthesize findings and update solution specs.'}
          </p>
        </div>
      </div>

      {/* Logged interviews */}
      {interviews.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Interview Log</h4>
          {interviews.map((intv, i) => (
            <div key={intv.id} className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 relative group">
              <button
                type="button"
                onClick={() => {
                  const updated = interviews.filter((_, j) => j !== i);
                  onChange({ ...data, interviews: updated, total_interviews: updated.length });
                }}
                className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <p className="text-xs font-bold text-slate-800">{intv.customer_name}</p>
              <p className="text-[10px] text-slate-400 mb-1.5">{intv.date || 'Recent'}</p>
              {intv.key_insights && (
                <p className="text-xs text-slate-600 mb-1">
                  <span className="font-semibold text-slate-700">Insights:</span> {intv.key_insights}
                </p>
              )}
              {intv.pain_points && (
                <p className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Pain points:</span> {intv.pain_points}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Interview */}
      <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50/40 space-y-2.5">
        <h4 className="text-xs font-bold text-slate-700">Record Customer Interview</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={newInterview.customer_name}
            onChange={(e) => setNewInterview((n) => ({ ...n, customer_name: e.target.value }))}
            placeholder="Participant name / role"
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          <input
            type="date"
            value={newInterview.date}
            onChange={(e) => setNewInterview((n) => ({ ...n, date: e.target.value }))}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
        </div>
        <textarea
          value={newInterview.key_insights}
          onChange={(e) => setNewInterview((n) => ({ ...n, key_insights: e.target.value }))}
          placeholder="What did they reveal regarding their habits or willingness to pay?"
          rows={2}
          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none"
        />
        <textarea
          value={newInterview.pain_points}
          onChange={(e) => setNewInterview((n) => ({ ...n, pain_points: e.target.value }))}
          placeholder="Main blockers or frustrations they shared..."
          rows={2}
          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-none"
        />
        <button
          type="button"
          onClick={addInterview}
          disabled={!newInterview.customer_name.trim()}
          className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" /> Save Interview
        </button>
      </div>

      <TextAreaField
        label="Key Findings & Recurring Patterns"
        hint="Summarize consensus across your interview conversations."
        value={data.key_findings || ''}
        onChange={(v) => onChange({ ...data, key_findings: v })}
        rows={3}
        placeholder="What surprised you? What validated or disproved your assumptions?"
      />
      <TextAreaField
        label="Adjustments & Pivots Made"
        hint="What changed in your original value proposition as a result of customer feedback?"
        value={data.changes_to_idea || ''}
        onChange={(v) => onChange({ ...data, changes_to_idea: v })}
        rows={2}
        placeholder="e.g. Pivoted pricing from subscription to per-transaction..."
      />
      <EvidenceLinks
        links={data.evidence_links || []}
        onChange={(l) => onChange({ ...data, evidence_links: l })}
      />
      <TextAreaField
        label="Stage 2 Completion Note"
        value={data.completion_note || ''}
        onChange={(v) => onChange({ ...data, completion_note: v })}
        rows={2}
        placeholder="Summary of validation evidence..."
      />
    </div>
  );
}

// Stage 3
function Stage3Form({
  data,
  onChange,
}: {
  data: Partial<PrototypeDevelopmentData>;
  onChange: (d: Partial<PrototypeDevelopmentData>) => void;
}) {
  const [taskInput, setTaskInput] = useState('');
  const [pendingInput, setPendingInput] = useState('');

  return (
    <div className="space-y-4">
      <div className="bg-teal-50/70 border border-teal-200/60 rounded-xl p-4">
        <p className="text-xs text-teal-900 font-bold mb-0.5">Stage 3: Prototype & MVP Development</p>
        <p className="text-xs text-teal-700 leading-relaxed">
          Build a testable prototype or interactive mockup to validate the core user flow with real people.
        </p>
      </div>

      <TextAreaField
        label="Prototype Scope & Architecture"
        hint="Detail the minimal feature set being built."
        value={data.prototype_description || ''}
        onChange={(v) => onChange({ ...data, prototype_description: v })}
        rows={3}
        placeholder="What technology, user flows, and core features are included in this version?"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Live Demo / Preview URL</label>
          <input
            type="url"
            value={data.demo_url || ''}
            onChange={(e) => onChange({ ...data, demo_url: e.target.value })}
            placeholder="https://preview.vercel.app"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Source Code / Figma URL</label>
          <input
            type="url"
            value={data.repo_url || ''}
            onChange={(e) => onChange({ ...data, repo_url: e.target.value })}
            placeholder="https://github.com/..."
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
      </div>

      {/* Completed tasks */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Completed Deliverables</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (taskInput.trim()) {
                  onChange({
                    ...data,
                    tasks_completed: [...(data.tasks_completed || []), taskInput.trim()],
                  });
                  setTaskInput('');
                }
              }
            }}
            placeholder="Add completed component or milestone..."
            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
          <button
            type="button"
            onClick={() => {
              if (taskInput.trim()) {
                onChange({
                  ...data,
                  tasks_completed: [...(data.tasks_completed || []), taskInput.trim()],
                });
                setTaskInput('');
              }
            }}
            className="px-3 py-1.5 bg-teal-100 text-teal-700 hover:bg-teal-200 rounded-xl text-xs font-semibold"
          >
            Add
          </button>
        </div>
        <div className="space-y-1">
          {(data.tasks_completed || []).map((t, i) => (
            <div key={i} className="flex items-center gap-2 p-2 bg-teal-50 rounded-xl border border-teal-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="text-xs text-slate-700 flex-1">{t}</span>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...data,
                    tasks_completed: (data.tasks_completed || []).filter((_, j) => j !== i),
                  })
                }
                className="text-slate-400 hover:text-rose-500"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Remaining tasks */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Remaining Backlog</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={pendingInput}
            onChange={(e) => setPendingInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (pendingInput.trim()) {
                  onChange({
                    ...data,
                    tasks_remaining: [...(data.tasks_remaining || []), pendingInput.trim()],
                  });
                  setPendingInput('');
                }
              }
            }}
            placeholder="Add upcoming task..."
            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30"
          />
          <button
            type="button"
            onClick={() => {
              if (pendingInput.trim()) {
                onChange({
                  ...data,
                  tasks_remaining: [...(data.tasks_remaining || []), pendingInput.trim()],
                });
                setPendingInput('');
              }
            }}
            className="px-3 py-1.5 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-xl text-xs font-semibold"
          >
            Add
          </button>
        </div>
        <div className="space-y-1">
          {(data.tasks_remaining || []).map((t, i) => (
            <div key={i} className="flex items-center gap-2 p-2 bg-amber-50/70 rounded-xl border border-amber-200/60">
              <Circle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-xs text-slate-700 flex-1">{t}</span>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...data,
                    tasks_remaining: (data.tasks_remaining || []).filter((_, j) => j !== i),
                  })
                }
                className="text-slate-400 hover:text-rose-500"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <TextAreaField
        label="Early Feedback on Prototype"
        value={data.prototype_feedback || ''}
        onChange={(v) => onChange({ ...data, prototype_feedback: v })}
        rows={2}
        placeholder="Reaction from technical advisors or test users..."
      />
      <EvidenceLinks
        links={data.evidence_links || []}
        onChange={(l) => onChange({ ...data, evidence_links: l })}
      />
      <TextAreaField
        label="Stage 3 Completion Note"
        value={data.completion_note || ''}
        onChange={(v) => onChange({ ...data, completion_note: v })}
        rows={2}
        placeholder="Confirmation of functioning prototype..."
      />
    </div>
  );
}

// Stage 4
function Stage4Form({
  data,
  onChange,
}: {
  data: Partial<PilotTestingData>;
  onChange: (d: Partial<PilotTestingData>) => void;
}) {
  const [newActivity, setNewActivity] = useState({
    activity: '',
    date: '',
    participants: '',
    outcome: '',
  });
  const activities = data.pilot_activities || [];

  const addActivity = () => {
    if (!newActivity.activity.trim()) return;
    const act: PilotActivity = {
      id: `pilot-${Date.now()}`,
      activity: newActivity.activity,
      date: newActivity.date,
      participants: parseInt(newActivity.participants) || 0,
      outcome: newActivity.outcome,
    };
    const updated = [...activities, act];
    onChange({
      ...data,
      pilot_activities: updated,
      participant_count: updated.reduce((s, a) => Math.max(s, a.participants), 0),
    });
    setNewActivity({ activity: '', date: '', participants: '', outcome: '' });
  };

  return (
    <div className="space-y-4">
      <div className="bg-orange-50/70 border border-orange-200/60 rounded-xl p-4">
        <p className="text-xs text-orange-900 font-bold mb-0.5">Stage 4: Pilot Testing & Feedback Loops</p>
        <p className="text-xs text-orange-700 leading-relaxed">
          Run controlled user tests or private beta cohorts to measure retention, usability bugs, and customer satisfaction.
        </p>
      </div>

      {activities.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Pilot Initiatives</h4>
          {activities.map((act, i) => (
            <div key={act.id} className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 relative group">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...data,
                    pilot_activities: activities.filter((_, j) => j !== i),
                  })
                }
                className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <p className="text-xs font-bold text-slate-800">{act.activity}</p>
              <p className="text-[10px] text-slate-400 mb-1">
                {act.date || 'Recent'} · {act.participants} participants
              </p>
              {act.outcome && <p className="text-xs text-slate-600">{act.outcome}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Add Pilot Activity */}
      <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50/40 space-y-2.5">
        <h4 className="text-xs font-bold text-slate-700">Add Pilot Program</h4>
        <input
          type="text"
          value={newActivity.activity}
          onChange={(e) => setNewActivity((n) => ({ ...n, activity: e.target.value }))}
          placeholder="Program Title (e.g. 2-Week Beta with 20 Students)"
          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            value={newActivity.date}
            onChange={(e) => setNewActivity((n) => ({ ...n, date: e.target.value }))}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
          />
          <input
            type="number"
            value={newActivity.participants}
            onChange={(e) => setNewActivity((n) => ({ ...n, participants: e.target.value }))}
            placeholder="# Participants"
            min="0"
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
          />
        </div>
        <textarea
          value={newActivity.outcome}
          onChange={(e) => setNewActivity((n) => ({ ...n, outcome: e.target.value }))}
          placeholder="Measurable findings, completion rate, or key feedback..."
          rows={2}
          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs resize-none"
        />
        <button
          type="button"
          onClick={addActivity}
          disabled={!newActivity.activity.trim()}
          className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" /> Log Pilot
        </button>
      </div>

      <TextAreaField
        label="Participant Feedback Summary"
        value={data.user_feedback || ''}
        onChange={(v) => onChange({ ...data, user_feedback: v })}
        rows={2}
        placeholder="What did users praise or criticize during the pilot?"
      />
      <TextAreaField
        label="Technical or UX Problems Discovered"
        value={data.problems_discovered || ''}
        onChange={(v) => onChange({ ...data, problems_discovered: v })}
        rows={2}
        placeholder="Bottlenecks, drop-off points, or confusing elements discovered..."
      />
      <TextAreaField
        label="Iterations Implemented"
        value={data.improvements_made || ''}
        onChange={(v) => onChange({ ...data, improvements_made: v })}
        rows={2}
        placeholder="How did you iterate based on user reactions?"
      />
      <EvidenceLinks
        links={data.evidence_links || []}
        onChange={(l) => onChange({ ...data, evidence_links: l })}
      />
      <TextAreaField
        label="Stage 4 Completion Note"
        value={data.completion_note || ''}
        onChange={(v) => onChange({ ...data, completion_note: v })}
        rows={2}
        placeholder="Summary of pilot viability..."
      />
    </div>
  );
}

// Stage 5
function Stage5Form({
  data,
  onChange,
}: {
  data: Partial<TractionGrowthData>;
  onChange: (d: Partial<TractionGrowthData>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-4">
        <p className="text-xs text-emerald-900 font-bold mb-0.5">Stage 5: Traction & Sustainable Growth</p>
        <p className="text-xs text-emerald-700 leading-relaxed">
          Log verified traction. Active users, retention ratios, letters of intent, or revenue all represent valid momentum indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Active Users (optional)</label>
          <input
            type="number"
            min="0"
            value={data.active_users ?? ''}
            onChange={(e) =>
              onChange({
                ...data,
                active_users: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            placeholder="e.g. 150"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Paying Customers (optional)</label>
          <input
            type="number"
            min="0"
            value={data.paying_customers ?? ''}
            onChange={(e) =>
              onChange({
                ...data,
                paying_customers: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            placeholder="e.g. 12"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Repeat Usage / Retention</label>
          <input
            type="text"
            value={data.repeat_usage_rate || ''}
            onChange={(e) => onChange({ ...data, repeat_usage_rate: e.target.value })}
            placeholder="e.g. 45% weekly active rate"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Revenue / MRR (optional)</label>
          <input
            type="text"
            value={data.revenue || ''}
            onChange={(e) => onChange({ ...data, revenue: e.target.value })}
            placeholder="e.g. $1,200 MRR or Pre-revenue"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
          />
        </div>
      </div>

      <TextAreaField
        label="Supporting Evidence"
        hint="Describe customer retention, letters of intent, contracts, or testimonials."
        value={data.supporting_evidence || ''}
        onChange={(v) => onChange({ ...data, supporting_evidence: v })}
        rows={3}
        placeholder="List verified data points supporting current traction..."
      />
      <TextAreaField
        label="Next Growth Milestone"
        hint="Define the next target for the founding team (e.g., seed round, 1,000 customers)."
        value={data.next_milestone || ''}
        onChange={(v) => onChange({ ...data, next_milestone: v })}
        rows={2}
        placeholder="Target milestone for upcoming quarter..."
      />
      <TextAreaField
        label="Core Lessons Learned"
        value={data.lessons_learned || ''}
        onChange={(v) => onChange({ ...data, lessons_learned: v })}
        rows={3}
        placeholder="Key lessons derived throughout the 5-stage venture cycle..."
      />
      <EvidenceLinks
        links={data.evidence_links || []}
        onChange={(l) => onChange({ ...data, evidence_links: l })}
      />
      <TextAreaField
        label="Stage 5 Completion Note"
        value={data.completion_note || ''}
        onChange={(v) => onChange({ ...data, completion_note: v })}
        rows={2}
        placeholder="Final traction synthesis..."
      />
    </div>
  );
}

export const LabProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [project, setProject] = useState<StartupProject | null>(null);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [stageData, setStageData] = useState<Record<number, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const p = getDemoLabProjectById(id);
      if (p) {
        setProject(p);
        setActiveStage(p.current_stage || 1);
        setStageData({
          1: p.stage1 || {},
          2: p.stage2 || {},
          3: p.stage3 || {},
          4: p.stage4 || {},
          5: p.stage5 || {},
        });
      }
      setLoading(false);
    }
  }, [id]);

  const getCurrentData = () => stageData[activeStage] || {};

  const handleSave = (markComplete = false) => {
    if (!project) return;

    const currentData = getCurrentData() as {
      status?: MilestoneStatus;
      completion_note?: string;
      interviews?: unknown[];
    };

    if (markComplete) {
      if (!currentData.completion_note?.trim()) {
        error('Please provide a milestone completion note before closing this stage.');
        return;
      }
      if (activeStage === 2) {
        const interviews = currentData.interviews || [];
        if (interviews.length < 1) {
          error('Please log at least 1 customer interview before completing validation.');
          return;
        }
      }
    }

    setSaving(true);
    const now = new Date().toISOString();
    const updatedData = {
      ...currentData,
      status: markComplete ? 'completed' : currentData.status === 'completed' ? 'completed' : 'in_progress',
      ...(markComplete ? { completed_at: now } : {}),
    };

    const stageKey = `stage${activeStage}` as keyof StartupProject;
    const newCurrentStage =
      markComplete && activeStage === project.current_stage && activeStage < 5
        ? ((activeStage + 1) as 1 | 2 | 3 | 4 | 5)
        : project.current_stage;

    const updatedProject: StartupProject = {
      ...project,
      [stageKey]: updatedData,
      current_stage: newCurrentStage,
      updated_at: now,
    };

    saveLabProject(updatedProject);
    setProject(updatedProject);
    setStageData((prev) => ({ ...prev, [activeStage]: updatedData }));
    setSaving(false);

    if (markComplete) {
      success(`Stage ${activeStage} completed! Advancing startup journey.`);
      if (newCurrentStage > activeStage) setActiveStage(newCurrentStage);
    } else {
      success('Stage draft saved.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <p className="text-slate-500 mb-4 text-sm">Project workspace not found.</p>
        <Link to="/lab">
          <Button variant="secondary">Return to Lab</Button>
        </Link>
      </div>
    );
  }

  const progress = getStageProgress(project);
  const overall = getOverallProgress(project);
  const nextAction = getNextAction(project);
  const isOwner = user?.id === project.owner_id;
  const currentStageStatus =
    ((stageData[activeStage] as { status?: MilestoneStatus }) || {}).status || 'not_started';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/lab" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Lab Projects
      </Link>

      {/* Project Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-slate-800 rounded-2xl p-6 mb-6 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <FlaskConical className="w-5 h-5 text-teal-400" />
              <h1 className="text-xl font-bold">{project.name}</h1>
            </div>
            <p className="text-slate-300 text-xs">
              {project.industry} · {project.business_model}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-teal-400">{overall}%</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Stage Completion</div>
          </div>
        </div>

        {/* 5-stage progress indicator */}
        <div className="mt-5">
          <div className="flex gap-2 mb-1">
            {progress.map((s) => (
              <div key={s.stage} className="flex-1">
                <div
                  className={`h-2 rounded-full ${
                    s.status === 'completed'
                      ? 'bg-teal-500'
                      : s.status === 'in_progress'
                      ? 'bg-teal-300/60'
                      : 'bg-slate-700'
                  }`}
                />
                <p className="text-[10px] text-slate-400 mt-1 text-center hidden sm:block truncate">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Step Recommendation */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3 shadow-xs">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-amber-900 mb-0.5">Recommended Next Milestone</p>
          <p className="text-xs text-amber-800 leading-relaxed">{nextAction}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Stage Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-2.5 space-y-1 shadow-xs">
            {STAGES.map((s) => {
              const stageProgress = progress.find((p) => p.stage === s.num);
              const isActive = activeStage === s.num;
              const Icon = s.icon;
              return (
                <button
                  key={s.num}
                  onClick={() => setActiveStage(s.num)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isActive
                        ? 'bg-teal-500 text-white'
                        : stageProgress?.status === 'completed'
                        ? 'bg-teal-100 text-teal-700'
                        : stageProgress?.status === 'in_progress'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {stageProgress?.status === 'completed' ? '✓' : s.num}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-semibold truncate ${isActive ? 'text-white' : ''}`}>
                      {s.label}
                    </p>
                    <p
                      className={`text-[10px] capitalize ${
                        isActive ? 'text-teal-300' : 'text-slate-400'
                      }`}
                    >
                      {stageProgress?.status?.replace('_', ' ') || 'not started'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Context Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Project Summary</h4>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Problem Focus</p>
              <p className="text-xs text-slate-700 line-clamp-3 mt-0.5 leading-relaxed">
                {project.problem_statement}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Proposed Solution</p>
              <p className="text-xs text-slate-700 line-clamp-3 mt-0.5 leading-relaxed">
                {project.proposed_solution}
              </p>
            </div>
            {project.required_team_skills.length > 0 && (
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase mb-1">Open Skill Needs</p>
                <div className="flex flex-wrap gap-1">
                  {project.required_team_skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-medium rounded-md border border-teal-200/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stage Content Workspace */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-800 text-base">
                  Stage {activeStage}: {STAGES[activeStage - 1]?.label}
                </h2>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                    currentStageStatus === 'completed'
                      ? 'bg-teal-100 text-teal-700'
                      : currentStageStatus === 'in_progress'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {currentStageStatus.replace('_', ' ')}
                </span>
              </div>
              {!isOwner && (
                <span className="text-[11px] text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                  Read-only view
                </span>
              )}
            </div>

            {/* Forms per stage */}
            {activeStage === 1 && (
              <Stage1Form
                data={(stageData[1] || {}) as Partial<ProblemDiscoveryData>}
                onChange={(d) => setStageData((prev) => ({ ...prev, 1: d }))}
              />
            )}
            {activeStage === 2 && (
              <Stage2Form
                data={(stageData[2] || {}) as Partial<CustomerValidationData>}
                onChange={(d) => setStageData((prev) => ({ ...prev, 2: d }))}
              />
            )}
            {activeStage === 3 && (
              <Stage3Form
                data={(stageData[3] || {}) as Partial<PrototypeDevelopmentData>}
                onChange={(d) => setStageData((prev) => ({ ...prev, 3: d }))}
              />
            )}
            {activeStage === 4 && (
              <Stage4Form
                data={(stageData[4] || {}) as Partial<PilotTestingData>}
                onChange={(d) => setStageData((prev) => ({ ...prev, 4: d }))}
              />
            )}
            {activeStage === 5 && (
              <Stage5Form
                data={(stageData[5] || {}) as Partial<TractionGrowthData>}
                onChange={(d) => setStageData((prev) => ({ ...prev, 5: d }))}
              />
            )}

            {/* Action Bar */}
            {isOwner && (
              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-5 border-t border-slate-100 items-center justify-between">
                <Button variant="secondary" onClick={() => handleSave(false)} loading={saving}>
                  <Save className="w-4 h-4 mr-1.5" /> Save Progress Draft
                </Button>
                {currentStageStatus !== 'completed' ? (
                  <Button variant="primary" onClick={() => handleSave(true)} loading={saving}>
                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Validate & Complete Stage {activeStage}
                  </Button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-teal-600 font-semibold bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                    <CheckCircle2 className="w-4 h-4" /> Stage marked complete
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabProjectDetail;
