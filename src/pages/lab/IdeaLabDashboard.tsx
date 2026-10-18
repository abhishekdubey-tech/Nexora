import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FlaskConical,
  Plus,
  Rocket,
  Trash2,
  Edit3,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  getDemoLabProjectsByUser,
  getStageProgress,
  getOverallProgress,
  getNextAction,
  deleteLabProject,
} from '../../lib/lab-demo-data';
import type { StartupProject } from '../../types';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

const STAGE_LABELS = [
  'Problem Discovery',
  'Customer Validation',
  'Prototype Development',
  'Pilot Testing',
  'Traction & Growth',
];

const STAGE_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-emerald-500',
];

export const IdeaLabDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { success } = useToast();
  const [projects, setProjects] = useState<StartupProject[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<StartupProject | null>(null);

  useEffect(() => {
    if (user) {
      setProjects(getDemoLabProjectsByUser(user.id));
    }
  }, [user]);

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteLabProject(deleteTarget.id);
    setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    success('Project removed from lab workspace');
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 shadow-inner">
          <FlaskConical className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Idea-to-Income Lab</h2>
        <p className="text-slate-500 mb-6 max-w-md text-sm">
          Sign in to access your guided 5-stage startup journey from initial problem to measurable traction.
        </p>
        <Link to="/auth/login">
          <Button variant="primary">Sign In to Open Lab</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-navy-900 flex items-center justify-center shadow-sm">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900">Idea-to-Income Lab</h1>
          </div>
          <p className="text-slate-500 text-sm">
            Interactive 5-stage venture framework: from customer problem discovery to sustainable revenue.
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/lab/new')}>
          <Plus className="w-4 h-4 mr-1.5" /> Start New Venture
        </Button>
      </div>

      {/* Stage Overview Banner */}
      <div className="bg-gradient-to-r from-navy-900 to-slate-800 rounded-2xl p-6 mb-8 text-white shadow-sm">
        <h2 className="font-bold text-base mb-4 text-teal-300">The 5-Stage Startup Journey</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {STAGE_LABELS.map((label, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full ${STAGE_COLORS[i]} flex items-center justify-center text-white font-bold text-xs shadow-md`}
              >
                {i + 1}
              </div>
              <span className="text-xs text-slate-300 leading-tight font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <FlaskConical className="w-14 h-14 text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-700 mb-2">No active lab projects</h3>
          <p className="text-slate-400 text-xs mb-6 max-w-sm text-center">
            Turn your business hypothesis into a validated prototype. Complete tasks, log customer interviews, and unlock traction.
          </p>
          <Button variant="primary" onClick={() => navigate('/lab/new')}>
            <Plus className="w-4 h-4 mr-1.5" /> Initialize First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => {
            const progress = getStageProgress(project);
            const overall = getOverallProgress(project);
            const nextAction = getNextAction(project);
            const currentStageLabel = STAGE_LABELS[(project.current_stage || 1) - 1];

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="p-5 pb-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-navy-900 truncate text-base hover:text-teal-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">{project.industry} · {project.business_model}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => navigate(`/lab/${project.id}`)}
                        className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        title="Open workspace"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(project)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Archive / Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {project.description || project.problem_statement}
                  </p>

                  {/* Overall Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-semibold text-slate-700">Journey Progress</span>
                      <span className="text-xs font-bold text-teal-600">{overall}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all"
                        style={{ width: `${overall}%` }}
                      />
                    </div>
                  </div>

                  {/* Stage Progress Tracker */}
                  <div className="flex gap-1.5">
                    {progress.map((s) => (
                      <div
                        key={s.stage}
                        title={`${s.label}: ${s.status}`}
                        className={`flex-1 h-1.5 rounded-full ${
                          s.status === 'completed'
                            ? 'bg-teal-500'
                            : s.status === 'in_progress'
                            ? 'bg-teal-300'
                            : 'bg-slate-100'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Active Stage Indicator */}
                  <div className="mt-3.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/60 px-2.5 py-1 rounded-full">
                      <Rocket className="w-3 h-3 text-teal-600" />
                      Stage {project.current_stage}: {currentStageLabel}
                    </span>
                  </div>
                </div>

                {/* Next Action Box */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50">
                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                    <strong className="text-slate-800">Next step: </strong>
                    {nextAction}
                  </p>
                </div>

                {/* Continue Action */}
                <div className="p-5 pt-3">
                  <Link
                    to={`/lab/${project.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold bg-navy-900 hover:bg-navy-800 text-white rounded-xl transition-all shadow-xs"
                  >
                    Enter Workspace <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Remove Lab Project"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to remove <strong>{deleteTarget?.name}</strong> from your active lab workspace?
          </p>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default IdeaLabDashboard;
