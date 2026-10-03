import React from 'react';

export interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'var(--color-yellow)',
  height = 14
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div style={{ width: '100%' }}>
      <div
        className="neo-progress-track"
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="neo-progress-fill"
          style={{
            width: `${clamped}%`,
            backgroundColor: clamped === 100 ? 'var(--color-green)' : color
          }}
        />
      </div>
    </div>
  );
};
