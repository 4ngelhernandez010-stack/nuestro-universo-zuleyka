async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, { headers: { 'Content-Type': 'application/json' }, ...options });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'No se pudo guardar.');
  return data;
}
export const api = {
  settings: () => request('/settings'),
  reasons: () => request('/reasons'),
  memories: () => request('/memories'),
  addMemory: (item) => request('/memories', { method: 'POST', body: JSON.stringify(item) }),
  deleteMemory: (id) => request(`/memories/${id}`, { method: 'DELETE' }),
  notes: () => request('/notes'),
  addNote: (text, mood) => request('/notes', { method: 'POST', body: JSON.stringify({ text, mood }) })
};
