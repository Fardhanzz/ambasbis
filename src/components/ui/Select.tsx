import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  id,
  children,
  className = '',
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.88rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--color-black)'
          }}
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`neo-select ${className}`}
        style={{ cursor: 'pointer' }}
        {...props}
      >
        {children}
      </select>
      {error && (
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--color-red)',
            marginTop: '2px'
          }}
        >
          ⚠️ {error}
        </span>
      )}
    </div>
  );
};
