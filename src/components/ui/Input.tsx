import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
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
      <input
        id={inputId}
        className={`neo-input ${className}`}
        {...props}
      />
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
