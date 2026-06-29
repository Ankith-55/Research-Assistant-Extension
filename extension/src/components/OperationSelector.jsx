import React from 'react';

export default function OperationSelector({ selected, onSelect }) {
  const operations = [
    { id: 'summarize', label: 'Summarize' },
    { id: 'suggest', label: 'Suggest Topics' },
    { id: 'quiz', label: 'Quiz' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
        Choose Operation
      </span>
      <div style={{ display: 'flex', gap: '8px' }}>
        {operations.map((op) => {
          const isSelected = selected === op.id;
          return (
            <button
              key={op.id}
              onClick={() => onSelect(op.id)}
              style={{
                flex: 1,
                padding: '8px 12px',
                backgroundColor: isSelected ? '#2563eb' : '#e5e7eb',
                color: isSelected ? '#ffffff' : '#374151',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
            >
              {op.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}