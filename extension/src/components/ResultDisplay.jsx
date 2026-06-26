import React, { useState } from 'react';

export default function ResultDisplay({ result }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API fails
      const textarea = document.createElement('textarea');
      textarea.value = result;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
          Result
        </span>
        <button
          onClick={handleCopy}
          style={{
            padding: '4px 12px',
            backgroundColor: copied ? '#059669' : '#e5e7eb',
            color: copied ? '#ffffff' : '#374151',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div
        style={{
          padding: '12px',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          color: '#111827',
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      >
        {result}
      </div>
    </div>
  );
}