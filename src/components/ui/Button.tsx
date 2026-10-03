import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'yellow' | 'green' | 'blue' | 'purple' | 'white';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const variantClass = `neo-btn-${variant}`;
  const sizeClass = size === 'sm' ? 'neo-btn-sm' : size === 'lg' ? 'neo-btn-lg' : '';

  return (
    <button
      className={`neo-btn ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
