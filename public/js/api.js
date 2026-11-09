const MEMORY_KEY = 'nuestro-universo-memories-v1';
const NOTE_KEY = 'nuestro-universo-notes-v1';

function read(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    throw new Error('No queda espacio en este navegador. Intente guardar una foto más pequeña.');
  }
}

async function loadSeed(name) {
  try {
    const response = await fetch(new URL(`../data/${name}.json`, import.meta.url));
    if (!response.ok) return [];
    const items = await response.json();
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

async function list(key, seedName) {
  const stored = localStorage.getItem(key);
  if (stored !== null) return read(key);
  const initial = await loadSeed(seedName);
  write(key, initial);
  return initial;
}

const createId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const api = {
  settings: async () => ({ name: 'Zuleyka', specialDate: '23 de junio' }),
  reasons: loadSeed('reasons'),
  memories: () => list(MEMORY_KEY, 'memories'),
  addMemory: async (item) => {
    const items = await list(MEMORY_KEY, 'memories');
    const saved = { ...item, id: createId(), createdAt: new Date().toISOString() };
    write(MEMORY_KEY, [saved, ...items]);
    return saved;
  },
  deleteMemory: async (id) => {
    const items = await list(MEMORY_KEY, 'memories');
    write(MEMORY_KEY, items.filter((item) => item.id !== id));
  },
  notes: () => list(NOTE_KEY, 'notes'),
  addNote: async (text, mood = '♥') => {
    const items = await list(NOTE_KEY, 'notes');
    const saved = { id: createId(), text, mood, createdAt: new Date().toISOString() };
    write(NOTE_KEY, [saved, ...items]);
    return saved;
  }
};
