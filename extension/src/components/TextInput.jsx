import React from 'react';

export default function TextInput({ value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor="content-input"
        style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}
      >
        Selected Text (editable)
      </label>
      <textarea
        id="content-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Select text on a webpage, or type/paste here..."
        rows={6}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '0.9rem',
          lineHeight: 1.4,
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
      />
    </div>
  );
}