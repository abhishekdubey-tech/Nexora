import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Send,
  Linkedin,
  Github,
  Globe,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDemoMentorsWithDetails } from '../../lib/demo-data';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

export const MentorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { success, error } = useToast();

  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [topic, setTopic] = useState('Technical Architecture & Strategy');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('2026-11-05');
  const [submitting, setSubmitting] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  const mentor = useMemo(() => {
    const list = getDemoMentorsWithDetails();
    return list.find((m) => m.id === id);
  }, [id]);

  if (!mentor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Mentor Profile Not Found</h2>
        <Link
          to="/mentors"
          className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mentors
        </Link>
      </div>
    );
  }

  const handleSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      error('Please log in to request a mentorship session.');
      navigate('/auth/login');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setHasRequested(true);
      setSessionModalOpen(false);
      success('Mentorship session requested! The mentor has been notified.');
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link
        to="/mentors"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Mentor Connect</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mentor Bio (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-navy-900 to-teal-700 text-teal-300 font-bold flex items-center justify-center text-2xl shadow-md">
                {mentor.profile?.full_name?.charAt(0) || 'M'}
              </div>
              <div>
                <h1 className="text-2xl font-black text-navy-900">
                  {mentor.profile?.full_name}
                </h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {mentor.profile?.headline}
                </p>
                <span className="inline-block mt-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                  {mentor.experience_years} Years Experience
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">About the Mentor</h3>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{mentor.bio}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Specialized Advising Topics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mentor.topics?.map((topicItem) => (
                  <div
                    key={topicItem}
                    className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-medium text-slate-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{topicItem}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Request Sidebar (1 col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Availability</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                {mentor.availability}
              </span>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Format: 45-minute 1:1 Video Call</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Complimentary Hackathon & Growth Session</span>
              </div>
            </div>

            {hasRequested ? (
              <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-xl text-xs font-semibold text-center">
                ✓ Session Request Submitted!
              </div>
            ) : (
              <Button
                variant="primary"
                fullWidth
                onClick={() => setSessionModalOpen(true)}
                className="py-3"
              >
                Schedule Mentorship Session
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={sessionModalOpen}
        onClose={() => setSessionModalOpen(false)}
        title={`Request 1:1 Session with ${mentor.profile?.full_name}`}
      >
        <form onSubmit={handleSessionSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Discussion Focus Area</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              {mentor.topics?.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Preferred Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              What specific questions or roadblocks would you like advice on?
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. We are validating our MVP architecture for real-time WebSockets and would love feedback on scaling bottlenecks..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setSessionModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={submitting}>
              Send Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MentorDetail;
