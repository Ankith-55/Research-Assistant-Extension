const API_BASE_URL = 'http://localhost:8080/api/research';

export async function processContent(content, operation) {
  const response = await fetch(`${API_BASE_URL}/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, operation }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Server error (${response.status}): ${errorText}`);
  }

  const result = await response.text();
  if (!result || result.trim().length === 0) {
    throw new Error('Received empty response from server');
  }

  return result;
}