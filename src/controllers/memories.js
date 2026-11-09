import { readCollection, updateCollection } from '../services/json-store.js';
import { makeId } from '../utils/id.js';
import { sendJson, sendError } from '../utils/response.js';
import { readBody } from '../middleware/body.js';
import { saveImage, removeImage } from '../services/media-store.js';

export async function listMemories(_req, res) {
  const items = await readCollection('memories');
  items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  sendJson(res, 200, items);
}
export async function createMemory(req, res) {
  const body = await readBody(req, 5_800_000);
  if (!body.title?.trim() || !body.note?.trim()) return sendError(res, 422, 'Escriba un título y un recuerdo.');
  const image = body.image ? await saveImage(body.image) : undefined;
  const item = { id: makeId(), title: body.title.trim().slice(0, 80), note: body.note.trim().slice(0, 500), date: body.date || null, place: String(body.place || '').slice(0, 80), emoji: String(body.emoji || '💌').slice(0, 8), ...(image ? { image } : {}) };
  await updateCollection('memories', (items) => [item, ...items]);
  sendJson(res, 201, item);
}
export async function deleteMemory(_req, res, id) {
  const before = await readCollection('memories');
  if (!before.some((item) => item.id === id)) return sendError(res, 404, 'No encontramos ese recuerdo.');
  await updateCollection('memories', (items) => items.filter((item) => item.id !== id));
  await removeImage(before.find((item) => item.id === id)?.image);
  sendJson(res, 200, { ok: true });
}
