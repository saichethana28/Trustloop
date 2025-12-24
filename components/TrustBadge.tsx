
import React from 'react';
import { ICONS } from '../constants';

interface TrustBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ score, size = 'md' }) => {
  const getColorClass = () => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-sky-600 bg-sky-50 border-sky-200';
    if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getLabel = () => {
    if (score >= 90) return 'Highly Trusted';
    if (score >= 75) return 'Reliable';
    if (score >= 50) return 'Average';
    return 'Risky';
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <div className={`inline-flex items-center font-semibold border rounded-full ${getColorClass()} ${sizeClasses[size]}`}>
      <span className="mr-1.5"><ICONS.Shield /></span>
      <span>{getLabel()} • {score}</span>
    </div>
  );
};
