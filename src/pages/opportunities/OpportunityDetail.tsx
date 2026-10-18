import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  DollarSign,
  Building,
  CheckCircle2,
  AlertCircle,
  Share2,
  Bookmark,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowLeft,
  Calendar,
  Layers,
  Flag,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDemoOpportunitiesWithDetails, demoApplications } from '../../lib/demo-data';
import { calculateMatchScore } from '../../lib/matching';
import MatchScoreBadge from '../../components/ui/MatchScoreBadge';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import TransparencyScoreBadge from '../../components/transparency/TransparencyScoreBadge';
import ReportModal from '../../components/transparency/ReportModal';

export const OpportunityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { success, error } = useToast();

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [reportReason, setReportReason] = useState('Spam or misleading information');
  const [isApplying, setIsApplying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Local storage application tracking
  const [appliedList, setAppliedList] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('nexora_applied_opps');
      if (stored) return JSON.parse(stored);
    } catch {}
    // Seed with Aisha Patel's demo application
    return user?.id === 'demo-user-1' ? ['demo-opp-1'] : [];
  });

  const opportunity = useMemo(() => {
    const list = getDemoOpportunitiesWithDetails();
    return list.find((o) => o.id === id);
  }, [id]);

  const matchData = useMemo(() => {
    if (!profile || !opportunity) return null;
    return calculateMatchScore(profile, opportunity);
  }, [profile, opportunity]);

  if (!opportunity) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Opportunity Not Found</h2>
        <p className="text-sm text-slate-500">
          The opportunity you are looking for may have expired, been removed, or does not exist.
        </p>
        <Link
          to="/opportunities"
          className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>
      </div>
    );
  }

  const hasApplied = appliedList.includes(opportunity.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      error('Please sign in or select a demo role to submit your application.');
      navigate('/auth/login');
      return;
    }

    if (hasApplied) {
      error('You have already submitted an application for this opportunity.');
      return;
    }

    setIsApplying(true);
    setTimeout(() => {
      const updated = [...appliedList, opportunity.id];
      setAppliedList(updated);
      localStorage.setItem('nexora_applied_opps', JSON.stringify(updated));
      setIsApplying(false);
      setApplyModalOpen(false);
      success('Application submitted successfully! Track your status on your Dashboard.');
    }, 600);
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportModalOpen(false);
    success('Thank you. This listing has been flagged for trust & safety review.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <Link
        to="/opportunities"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Opportunity Marketplace</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs space-y-6">
            {/* Header badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="teal" size="md">
                  {opportunity.type.replace('_', ' ').toUpperCase()}
                </Badge>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-md capitalize font-medium">
                  {opportunity.work_mode}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-md capitalize font-medium">
                  {opportunity.experience_level} Experience
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isSaved
                      ? 'bg-teal-50 text-teal-700 border-teal-200'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-teal-600' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Title & Organization */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                {opportunity.title}
              </h1>
              {opportunity.organization && (
                <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                  <Building className="w-4 h-4 text-teal-600" />
                  <span className="font-semibold text-slate-800">{opportunity.organization.name}</span>
                  {opportunity.organization.verification_status === 'verified' && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-semibold border border-teal-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Verified Entity
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Compensation</span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {opportunity.compensation || 'Unspecified'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Location</span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {opportunity.location || 'Remote'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Application Deadline</span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {opportunity.deadline
                    ? new Date(opportunity.deadline).toLocaleDateString()
                    : 'Open until filled'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Detailed Overview
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {opportunity.description}
              </div>
            </div>

            {/* Skills Required */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Required Technical & Domain Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {opportunity.required_skills?.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls (1 Column) */}
        <div className="space-y-6">
          {/* Smart Fit Box */}
          {matchData && (
            <div className="bg-gradient-to-br from-teal-950 to-navy-950 rounded-3xl p-6 text-white border border-teal-500/20 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  Opportunity Fit Score
                </span>
                <span className="text-2xl font-black text-teal-300">{matchData.overall}%</span>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-teal-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${matchData.overall}%` }}
                />
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p className="font-semibold text-white">Algorithm Recommendation Breakdown:</p>
                <ul className="space-y-1.5">
                  {matchData.reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-snug">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-800 italic">
                Computed transparently using skills (40%), interests (25%), goals (20%), and location (10%).
              </p>
            </div>
          )}

          {/* Opportunity Transparency Score Panel */}
          {opportunity && (
            <TransparencyScoreBadge
              opportunity={opportunity}
              showPanel={true}
              isRecruiter={profile?.role === 'recruiter'}
            />
          )}

          {/* Action Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Submit Application</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Applications are reviewed directly by the opportunity creator. Your verified public profile will be
              attached.
            </p>

            {hasApplied ? (
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>You have applied to this role. Check your dashboard for status updates.</span>
              </div>
            ) : (
              <Button
                variant="primary"
                fullWidth
                onClick={() => setApplyModalOpen(true)}
                className="py-3"
              >
                Apply In-Platform
              </Button>
            )}

            {/* Quality Checklist */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Quality & Completeness Checklist
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Comprehensive job scope provided</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Explicit required skill parameters</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Transparent compensation indicator</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified poster profile</span>
                </li>
              </ul>
              <p className="text-[10px] text-slate-400 pt-1 leading-tight">
                Completeness indicates structured data; independent due diligence is always advised.
              </p>
            </div>

            {/* Report */}
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setReportModalOpen(true)}
                className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <Flag className="w-3 h-3" />
                <span>Report this listing</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply for: ${opportunity.title}`}
      >
        <form onSubmit={handleApply} className="space-y-4 pt-2">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800">
              Applying as: <span className="text-teal-700">{profile?.full_name || 'Guest User'}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              Role: {profile?.role?.replace('_', ' ')} • Skills: {profile?.skills?.slice(0, 3).join(', ') || 'None'}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Cover Note & Statement of Interest <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Highlight your relevant experience, why this opportunity excites you, and what makes you a standout collaborator..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setApplyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={isApplying}>
              Confirm & Submit Application
            </Button>
          </div>
        </form>
      </Modal>

      {/* Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        opportunityId={opportunity.id}
        opportunityTitle={opportunity.title}
      />
    </div>
  );
};

export default OpportunityDetail;
