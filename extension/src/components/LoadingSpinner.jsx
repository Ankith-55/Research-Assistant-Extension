import React from 'react';

export default function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '16px 0',
        color: '#4b5563',
        fontSize: '0.9rem',
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #2563eb',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }}
      />
      <span>Processing...</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}