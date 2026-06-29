import React, { useState } from 'react';

export default function QuizDisplay({ questions }) {
  const [selected, setSelected] = useState(new Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (qIndex, oIndex) => {
    if (submitted) return;   // don't allow changes after submit
    const newSelected = [...selected];
    newSelected[qIndex] = oIndex;
    setSelected(newSelected);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const correctCount = selected.reduce((count, ans, i) => {
    return ans === questions[i].correctIndex ? count + 1 : count;
  }, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1f2937' }}>Quiz</h2>
      {questions.map((q, qIndex) => {
        const isCorrect = selected[qIndex] === q.correctIndex;
        const isWrong = submitted && selected[qIndex] !== null && !isCorrect;

        return (
          <div key={qIndex} style={{ padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <p style={{ fontWeight: 600, marginBottom: '8px', color: '#111827' }}>
              {qIndex + 1}. {q.question}
            </p>
            {q.options.map((option, oIndex) => {
              let bgColor = '#f3f4f6';
              let borderColor = '#e5e7eb';
              if (submitted) {
                if (oIndex === q.correctIndex) {
                  bgColor = '#d1fae5';
                  borderColor = '#10b981';
                } else if (selected[qIndex] === oIndex && !isCorrect) {
                  bgColor = '#fee2e2';
                  borderColor = '#ef4444';
                }
              } else if (selected[qIndex] === oIndex) {
                bgColor = '#dbeafe';
                borderColor = '#2563eb';
              }

              return (
                <div
                  key={oIndex}
                  onClick={() => handleOptionClick(qIndex, oIndex)}
                  style={{
                    padding: '6px 10px',
                    margin: '4px 0',
                    backgroundColor: bgColor,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '4px',
                    cursor: submitted ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '0.9rem',
                    color: '#374151',
                  }}
                >
                  {String.fromCharCode(65 + oIndex)}. {option}
                </div>
              );
            })}
            {submitted && isWrong && (
              <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '4px' }}>
                Correct answer: {String.fromCharCode(65 + q.correctIndex)}
              </p>
            )}
          </div>
        );
      })}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected.includes(null)}
          style={{
            padding: '10px',
            backgroundColor: selected.includes(null) ? '#9ca3af' : '#059669',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: selected.includes(null) ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          Submit Answers
        </button>
      ) : (
        <div style={{ textAlign: 'center', fontWeight: 600, fontSize: '1rem', color: '#1f2937' }}>
          Your Score: {correctCount} / {questions.length}
        </div>
      )}
    </div>
  );
}