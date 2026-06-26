import { useState, useEffect } from 'react';

export default function useSelectedText() {
  const [selectedText, setSelectedText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Get the current active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) {
          throw new Error('No active tab found');
        }

        // Inject a script to read the selection from the page
        const [result] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => window.getSelection()?.toString() ?? '',
        });

        setSelectedText(result?.result ?? '');
      } catch (err) {
        setError(err.message || 'Could not retrieve selected text');
        setSelectedText('');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { selectedText, error, loading };
}