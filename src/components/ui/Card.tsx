import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'cream' | 'yellow' | 'green' | 'blue' | 'purple' | 'red';
  interactive?: boolean;
  hasStar?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'white',
  interactive = false,
  hasStar = false,
  children,
  className = '',
  style,
  ...props
}) => {
  const bgMap: Record<string, string> = {
    white: 'var(--color-card-bg)',
    cream: '#FDF6EE',
    yellow: 'var(--color-yellow)',
    green: 'var(--color-green)',
    blue: 'var(--color-blue)',
    purple: 'var(--color-purple)',
    red: '#FFE5E3'
  };

  const interactiveClass = interactive ? 'neo-card-interactive' : '';

  return (
    <div
      className={`neo-card ${interactiveClass} ${className}`}
      style={{
        backgroundColor: bgMap[variant] || 'var(--color-card-bg)',
        position: 'relative',
        ...style
      }}
      {...props}
    >
      {hasStar && (
        <div
          className="neo-star-badge"
          style={{ top: '-14px', right: '-12px', zIndex: 10 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFD447" stroke="#171313" strokeWidth="2.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      )}
      {children}
    </div>
  );
};
