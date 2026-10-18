import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { calculateTransparencyScore, getScoreColor, getScoreBgColor, getGradeBadgeClasses } from '../../lib/transparency';
import type { Opportunity } from '../../types';

interface Props {
  opportunity: Opportunity;
  compact?: boolean;
  showPanel?: boolean;
  isRecruiter?: boolean;
}

const CRITERIA_LABELS: Record<string, string> = {
  organization_verification: 'Organization Verification',
  compensation_disclosure: 'Compensation Disclosure',
  responsibilities_described: 'Responsibilities Described',
  eligibility_specified: 'Eligibility / Skills Specified',
  deadline_and_process: 'Deadline & Selection Process',
  application_method: 'Application Method',
};

const CRITERIA_MAX: Record<string, number> = {
  organization_verification: 25,
  compensation_disclosure: 20,
  responsibilities_described: 20,
  eligibility_specified: 15,
  deadline_and_process: 10,
  application_method: 10,
};

export const TransparencyScoreBadge: React.FC<Props> = ({
  opportunity,
  compact = false,
  showPanel = false,
  isRecruiter = false,
}) => {
  const score = calculateTransparencyScore(opportunity);
  const [expanded, setExpanded] = useState(showPanel);

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-bold cursor-pointer hover:opacity-90 transition-opacity ${getScoreBgColor(score.total)}`}
        title={`Transparency Score: ${score.total}/100 — ${score.label}`}
      >
        <ShieldCheck className={`w-3.5 h-3.5 ${getScoreColor(score.total)}`} />
        <span className={getScoreColor(score.total)}>{score.total}</span>
        <span className={`font-semibold ${getScoreColor(score.total)}`}>T-Score</span>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border p-5 ${getScoreBgColor(score.total)}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-5 h-5 ${getScoreColor(score.total)}`} />
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Transparency Score</h3>
            <p className="text-[11px] text-slate-500">Listing clarity and completeness</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-black ${getScoreColor(score.total)}`}>{score.total}</div>
          <div className="text-[10px] text-slate-400">/100</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="h-2.5 bg-white/70 rounded-full overflow-hidden border border-white/50">
          <div
            className={`h-full rounded-full transition-all ${
              score.total >= 85 ? 'bg-emerald-500' :
              score.total >= 70 ? 'bg-teal-500' :
              score.total >= 55 ? 'bg-amber-500' :
              score.total >= 40 ? 'bg-orange-500' :
              'bg-rose-500'
            }`}
            style={{ width: `${score.total}%` }}
          />
        </div>
      </div>

      {/* Grade and toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getGradeBadgeClasses(score.grade)}`}>
          Grade {score.grade} — {score.label}
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors"
        >
          {expanded ? <><ChevronUp className="w-3.5 h-3.5" /> Less</> : <><ChevronDown className="w-3.5 h-3.5" /> Breakdown</>}
        </button>
      </div>

      {/* Highlights */}
      {score.highlights.length > 0 && (
        <div className="space-y-1.5 mb-3">
          {score.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700">{h}</p>
            </div>
          ))}
        </div>
      )}

      {/* Expanded Breakdown */}
      {expanded && (
        <div className="space-y-3 mt-4 pt-4 border-t border-white/60">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Scoring Breakdown</h4>
          {Object.entries(score.breakdown).map(([key, value]) => {
            const max = CRITERIA_MAX[key] || 10;
            const pct = (value / max) * 100;
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-600">{CRITERIA_LABELS[key] || key}</span>
                  <span className="text-xs font-bold text-slate-700">{value}/{max}</span>
                </div>
                <div className="h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      pct >= 80 ? 'bg-emerald-500' :
                      pct >= 50 ? 'bg-amber-500' :
                      'bg-rose-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Improvement advice for recruiters or low-scoring listings */}
      {(isRecruiter || expanded) && score.improvements.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/60">
          <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-500" />
            Suggested Transparency Improvements
          </h4>
          <div className="space-y-2">
            {score.improvements.map((imp, i) => (
              <div key={i} className="flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600">{imp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-[10px] text-slate-400 mt-4 pt-3 border-t border-white/40">
        Objective score generated from verified fields. Reports are reviewed manually by admins.
      </p>
    </div>
  );
};

export default TransparencyScoreBadge;
