import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { DATA_DIR } from '../config.js';
import { makeId } from '../utils/id.js';

const imageTypes = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const maxImageBytes = 4 * 1024 * 1024;

export async function saveImage(dataUrl) {
  const match = typeof dataUrl === 'string' && dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match) throw Object.assign(new Error('Seleccione una foto JPG, PNG o WebP.'), { status: 422 });
  const bytes = Buffer.from(match[2], 'base64');
  if (!bytes.length || bytes.length > maxImageBytes) throw Object.assign(new Error('La foto no debe superar los 4 MB.'), { status: 413 });
  const folder = path.join(DATA_DIR, 'uploads');
  await mkdir(folder, { recursive: true });
  const filename = `${makeId()}.${imageTypes[match[1]]}`;
  await writeFile(path.join(folder, filename), bytes, { flag: 'wx' });
  return `/media/${filename}`;
}

export async function removeImage(url) {
  const match = typeof url === 'string' && url.match(/^\/media\/([\da-f-]+\.(?:jpg|png|webp))$/i);
  if (!match) return;
  try { await unlink(path.join(DATA_DIR, 'uploads', match[1])); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}
