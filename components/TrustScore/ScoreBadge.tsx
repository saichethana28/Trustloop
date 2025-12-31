
import React from 'react';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, size = 'md', showLabel = true }) => {
  const getColor = () => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score >= 70) return 'text-indigo-600 bg-indigo-50 border-indigo-100';
    if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  const getIcon = () => {
    if (score >= 90) return <ShieldCheck size={size === 'sm' ? 14 : size === 'md' ? 18 : 24} />;
    if (score >= 70) return <Shield size={size === 'sm' ? 14 : size === 'md' ? 18 : 24} />;
    return <ShieldAlert size={size === 'sm' ? 14 : size === 'md' ? 18 : 24} />;
  };

  const textSizes = {
    sm: 'text-xs py-0.5 px-1.5 gap-1',
    md: 'text-sm py-1 px-2.5 gap-1.5',
    lg: 'text-lg py-2 px-4 gap-2 font-bold'
  };

  return (
    <div className={`inline-flex items-center rounded-full border ${getColor()} ${textSizes[size]}`}>
      {getIcon()}
      {showLabel && <span>{score}% <span className="opacity-80 font-normal">Trust</span></span>}
    </div>
  );
};

export default ScoreBadge;
