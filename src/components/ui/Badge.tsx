import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'white' | 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'dark';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'white',
  icon,
  children,
  className = '',
  style,
  ...props
}) => {
  const colorStyles: Record<string, { bg: string; text: string }> = {
    white: { bg: '#FFFFFF', text: 'var(--color-black)' },
    red: { bg: 'var(--color-red)', text: '#FFFFFF' },
    yellow: { bg: 'var(--color-yellow)', text: 'var(--color-black)' },
    green: { bg: 'var(--color-green)', text: 'var(--color-black)' },
    blue: { bg: 'var(--color-blue)', text: 'var(--color-black)' },
    purple: { bg: 'var(--color-purple)', text: 'var(--color-black)' },
    dark: { bg: 'var(--color-black)', text: '#FFFFFF' }
  };

  const current = colorStyles[variant] || colorStyles.white;

  return (
    <span
      className={`neo-badge ${className}`}
      style={{
        backgroundColor: current.bg,
        color: current.text,
        ...style
      }}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
