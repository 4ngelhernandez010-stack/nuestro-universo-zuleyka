import { readCollection, updateCollection } from '../services/json-store.js';
import { makeId } from '../utils/id.js';
import { sendJson, sendError } from '../utils/response.js';
import { readBody } from '../middleware/body.js';

export async function listNotes(_req, res) {
  const items = await readCollection('notes');
  items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  sendJson(res, 200, items);
}
export async function createNote(req, res) {
  const body = await readBody(req);
  if (!body.text?.trim()) return sendError(res, 422, 'La notita está vacía.');
  const item = { id: makeId(), text: body.text.trim().slice(0, 500), mood: String(body.mood || '💗').slice(0, 8), createdAt: new Date().toISOString() };
  await updateCollection('notes', (items) => [item, ...items]);
  sendJson(res, 201, item);
}
