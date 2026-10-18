import React, { useState } from 'react';
import { Sparkles, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { getMatchBgColor, getMatchColor } from '../../lib/matching';

interface MatchScoreBadgeProps {
  score: number;
  reasons?: string[];
  showDetails?: boolean;
  className?: string;
}

export const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({
  score,
  reasons = [],
  showDetails = false,
  className = '',
}) => {
  const [expanded, setExpanded] = useState(showDetails);

  return (
    <div className={`inline-block ${className}`}>
      <div
        onClick={() => reasons.length > 0 && setExpanded(!expanded)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer select-none transition-all ${getMatchBgColor(
          score
        )} hover:opacity-90 shadow-sm`}
        title="Calculated via transparent weighted matching algorithm"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{score}% Match</span>
        {reasons.length > 0 && (
          expanded ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />
        )}
      </div>

      {expanded && reasons.length > 0 && (
        <div className="mt-2 p-3 bg-white/95 rounded-xl border border-gray-100 shadow-md text-xs text-navy-800 space-y-1.5 animate-fadeIn">
          <div className="font-semibold text-navy-900 flex items-center gap-1 pb-1 border-b border-gray-100">
            <Info className="w-3.5 h-3.5 text-teal-600" />
            <span>Why this matches you:</span>
          </div>
          <ul className="space-y-1 text-gray-600">
            {reasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-teal-500 font-bold leading-none mt-0.5">•</span>
                <span className="leading-snug">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchScoreBadge;
