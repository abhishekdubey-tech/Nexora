import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Rocket,
  CheckCircle2,
  XCircle,
  Users,
  Target,
  ArrowLeft,
  Sparkles,
  Send,
  Globe,
  Building,
  User,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDemoStartupsWithDetails } from '../../lib/demo-data';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

export const StartupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { success, error } = useToast();

  const [collabModalOpen, setCollabModalOpen] = useState(false);
  const [collabMessage, setCollabMessage] = useState('');
  const [skillsOffered, setSkillsOffered] = useState<string[]>(['React', 'UI/UX Design']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  const startup = useMemo(() => {
    const list = getDemoStartupsWithDetails();
    return list.find((s) => s.id === id);
  }, [id]);

  if (!startup) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Startup Not Found</h2>
        <Link
          to="/startups"
          className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Startup Launchpad
        </Link>
      </div>
    );
  }

  const handleCollabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      error('Please log in to submit a collaboration request.');
      navigate('/auth/login');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setHasRequested(true);
      setCollabModalOpen(false);
      success('Collaboration request sent! The founder will receive your profile and message.');
    }, 600);
  };

  const validationItems = [
    { label: 'Problem identified & clearly articulated', checked: startup.has_problem },
    { label: 'Target user personas & market segment defined', checked: startup.has_target_users },
    { label: 'Differentiated solution proposed', checked: startup.has_solution },
    { label: 'Preliminary market / competitor research conducted', checked: startup.has_market_research },
    { label: 'Working prototype or proof of concept deployed', checked: startup.has_prototype },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link
        to="/startups"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Startup Launchpad</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="teal" size="md">
                  {startup.stage.toUpperCase()} STAGE
                </Badge>
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded-md">
                  {startup.industry}
                </span>
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded-md capitalize">
                  {startup.funding_status}
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-black text-navy-900 tracking-tight">{startup.name}</h1>
              <p className="text-sm font-medium text-teal-700 mt-1">{startup.tagline}</p>
            </div>

            {/* Problem Statement */}
            <div className="space-y-2 p-5 bg-rose-50/50 rounded-2xl border border-rose-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-2">
                <Target className="w-4 h-4 text-rose-600" />
                The Problem
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">{startup.problem}</p>
            </div>

            {/* Proposed Solution */}
            <div className="space-y-2 p-5 bg-teal-50/50 rounded-2xl border border-teal-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                The Solution & Unique Value Prop
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">{startup.solution}</p>
            </div>

            {/* Target Audience & Business Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                  Target Audience
                </span>
                <p className="text-slate-800 font-medium">{startup.target_audience}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                  Business / Monetization Model
                </span>
                <p className="text-slate-800 font-medium">{startup.business_model}</p>
              </div>
            </div>

            {/* Required Skills */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Co-Founder & Team Skills Needed
              </h3>
              <div className="flex flex-wrap gap-2">
                {startup.required_skills?.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 bg-slate-100 text-navy-900 rounded-lg text-xs font-semibold border border-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (1 column) */}
        <div className="space-y-6">
          {/* Validation Checklist Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Validation Checklist</h3>
              <span className="text-[11px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                {validationItems.filter((i) => i.checked).length}/5 Checked
              </span>
            </div>

            <ul className="space-y-3">
              {validationItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs">
                  {item.checked ? (
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  )}
                  <span className={item.checked ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 leading-snug">
              Note: This validation checklist is a framework tool for early progress tracking and does not guarantee
              commercial viability or business success.
            </div>
          </div>

          {/* Founder Box & Collab */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
            <h3 className="font-bold text-sm text-slate-900">Founder & Team</h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-navy-900 text-teal-300 font-bold flex items-center justify-center text-base">
                {startup.founder?.full_name?.charAt(0) || 'F'}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {startup.founder?.full_name || 'Founder'}
                </h4>
                <p className="text-xs text-slate-500 leading-tight mt-0.5">
                  {startup.founder?.headline || 'Startup Visionary'}
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Current Team:</span>
                <span className="font-bold text-slate-800">{startup.team_size} members</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="font-bold text-slate-800">{startup.founder?.location || 'Remote'}</span>
              </div>
            </div>

            {hasRequested ? (
              <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl text-xs font-semibold text-center">
                ✓ Collaboration Request Sent
              </div>
            ) : (
              <Button
                variant="primary"
                fullWidth
                onClick={() => setCollabModalOpen(true)}
                className="py-3"
              >
                Request to Collaborate / Co-Found
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Collaboration Modal */}
      <Modal
        isOpen={collabModalOpen}
        onClose={() => setCollabModalOpen(false)}
        title={`Express Collaboration Interest: ${startup.name}`}
      >
        <form onSubmit={handleCollabSubmit} className="space-y-4 pt-2">
          <p className="text-xs text-slate-600">
            Tell {startup.founder?.full_name} how your background and complementary skills can help propel{' '}
            {startup.name} forward.
          </p>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Skills You Bring to the Table</label>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'UI/UX Design', 'Node.js', 'Machine Learning', 'Marketing', 'Product Strategy'].map(
                (skill) => {
                  const selected = skillsOffered.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() =>
                        setSkillsOffered(
                          selected ? skillsOffered.filter((s) => s !== skill) : [...skillsOffered, skill]
                        )
                      }
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        selected
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {selected ? `✓ ${skill}` : `+ ${skill}`}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Introductory Message</label>
            <textarea
              required
              rows={4}
              value={collabMessage}
              onChange={(e) => setCollabMessage(e.target.value)}
              placeholder="Hi! I came across your venture on Nexora and would love to collaborate on the frontend architecture and product validation..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setCollabModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={isSubmitting}>
              Send Collaboration Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StartupDetail;
