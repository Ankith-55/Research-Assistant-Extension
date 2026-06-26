import React, { useState } from 'react';
import useSelectedText from '../hooks/useSelectedText';
import { processContent } from '../services/api';
import TextInput from './TextInput';
import OperationSelector from './OperationSelector';
import LoadingSpinner from './LoadingSpinner';
import ResultDisplay from './ResultDisplay';

export default function App() {
  const { selectedText, error: selectionError, loading: selectionLoading } = useSelectedText();
  const [text, setText] = useState('');
  const [operation, setOperation] = useState('summarize');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // When the hook finishes fetching selected text, sync it into the editable text state
  React.useEffect(() => {
    if (!selectionLoading && selectedText) {
      setText(selectedText);
    }
  }, [selectionLoading, selectedText]);

  const handleProcess = async () => {
    if (!text.trim()) {
      setError('Please provide some text to process.');
      return;
    }
    setError('');
    setResult('');
    setLoading(true);
    try {
      const output = await processContent(text, operation);
      setResult(output);
    } catch (err) {
      setError(err.message || 'Something went wrong while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '4px' }}>
        Research Assistant
      </h1>

      {selectionLoading ? (
        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Grabbing selected text...</p>
      ) : selectionError ? (
        <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>
          {selectionError}
        </p>
      ) : null}

      <TextInput value={text} onChange={setText} />

      <OperationSelector selected={operation} onSelect={setOperation} />

      <button
        onClick={handleProcess}
        disabled={loading || !text.trim()}
        style={{
          padding: '10px 16px',
          backgroundColor: loading || !text.trim() ? '#9ca3af' : '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: loading || !text.trim() ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        {loading ? 'Processing...' : 'Process'}
      </button>

      {loading && <LoadingSpinner />}

      {error && !loading && (
        <div style={{ color: '#dc2626', fontSize: '0.9rem', padding: '8px', backgroundColor: '#fee2e2', borderRadius: '6px' }}>
          {error}
        </div>
      )}

      {result && !loading && !error && <ResultDisplay result={result} />}
    </div>
  );
}