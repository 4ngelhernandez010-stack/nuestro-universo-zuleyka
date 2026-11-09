import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { DATA_DIR } from '../config.js';

const queues = new Map();
export async function readCollection(name, fallback = []) {
  await mkdir(DATA_DIR, { recursive: true });
  try { return JSON.parse(await readFile(path.join(DATA_DIR, `${name}.json`), 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return fallback; throw error; }
}

export function updateCollection(name, transform, fallback = []) {
  const previous = queues.get(name) || Promise.resolve();
  const next = previous.then(async () => {
    const current = await readCollection(name, fallback);
    const updated = await transform(current);
    await writeFile(path.join(DATA_DIR, `${name}.json`), JSON.stringify(updated, null, 2));
    return updated;
  });
  queues.set(name, next.catch(() => {}));
  return next;
}
