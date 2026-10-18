import React from 'react';
import { X } from 'lucide-react';

interface SkillTagProps {
  skill: string;
  removable?: boolean;
  onRemove?: () => void;
  size?: 'sm' | 'md';
}

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
};

export const SkillTag: React.FC<SkillTagProps> = ({
  skill,
  removable = false,
  onRemove,
  size = 'sm',
}) => {
  return (
    <span
      className={`
        inline-flex items-center rounded-full bg-teal-50 font-medium text-teal-700 border border-teal-200
        ${sizeClasses[size]}
      `}
    >
      {skill}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="rounded-full p-0.5 transition-colors hover:bg-teal-200 hover:text-teal-900"
          aria-label={`Remove ${skill}`}
        >
          <X className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
        </button>
      )}
    </span>
  );
};

export default SkillTag;
