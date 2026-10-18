import React, { useState } from 'react';
import { Flag, AlertCircle, CheckCircle2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useToast } from '../ui/Toast';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  opportunityId: string;
  opportunityTitle: string;
}

const REPORT_REASONS = [
  'Misleading or inaccurate role description',
  'Compensation differs from listed amount',
  'Suspicious or fraudulent posting',
  'Expired or inactive listing still live',
  'Inappropriate or discriminatory criteria',
  'Contact information / link invalid',
  'Other listing quality concern',
];

export const ReportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  opportunityId,
  opportunityTitle,
}) => {
  const { user } = useAuth();
  const { success, error } = useToast();
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      error('Please sign in to submit a report');
      return;
    }
    if (!details.trim()) {
      error('Please provide specific details explaining your concern');
      return;
    }

    setSubmitting(true);

    // Save report to localStorage for review
    try {
      const existing = JSON.parse(localStorage.getItem('nexora_reports') || '[]');
      existing.push({
        id: `report-${Date.now()}`,
        reporter_id: user.id,
        target_type: 'opportunity',
        target_id: opportunityId,
        reason,
        details: details.trim(),
        status: 'pending',
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('nexora_reports', JSON.stringify(existing));
    } catch {}

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      success('Report logged for administrator review');
    }, 400);
  };

  const handleClose = () => {
    setSubmitted(false);
    setDetails('');
    setReason(REPORT_REASONS[0]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Report Opportunity Listing" maxWidth="md">
      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base mb-1">Report Logged for Review</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
              Thank you for keeping Nexora opportunities transparent and legitimate. Our moderation team will review this listing.
            </p>
          </div>
          <div className="pt-2">
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <p className="text-xs text-slate-400 mb-0.5">Opportunity under review:</p>
            <p className="text-sm font-semibold text-slate-800 truncate">{opportunityTitle}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Primary Concern
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {REPORT_REASONS.map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                    reason === r
                      ? 'border-teal-500 bg-teal-50/70 text-navy-900 font-medium'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="accent-teal-600"
                  />
                  <span className="text-xs">{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Specific Details *
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide evidence or context regarding what is inaccurate or suspicious..."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 resize-none"
            />
          </div>

          <div className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-normal">
              Reports do not automatically remove opportunities. Verified administrators investigate each submission to maintain ecosystem integrity.
            </p>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" loading={submitting}>
              <Flag className="w-3.5 h-3.5 mr-1.5" /> Submit Report
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ReportModal;
