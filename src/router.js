import { extname, join, normalize } from 'node:path';
import { readFile } from 'node:fs/promises';
import { DATA_DIR, PUBLIC_DIR } from './config.js';
import { applyCors } from './middleware/cors.js';
import { handleError } from './middleware/errors.js';
import { sendJson, sendError } from './utils/response.js';
import { listMemories, createMemory, deleteMemory } from './controllers/memories.js';
import { listNotes, createNote } from './controllers/notes.js';
import { getSettings } from './controllers/settings.js';
import { listReasons } from './controllers/reasons.js';

const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.ico':'image/x-icon' };
export async function handleRequest(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname === '/api/health') return sendJson(res, 200, { ok: true });
    if (url.pathname === '/api/settings' && req.method === 'GET') return getSettings(req, res);
    if (url.pathname === '/api/reasons' && req.method === 'GET') return await listReasons(req, res);
    if (url.pathname === '/api/memories' && req.method === 'GET') return await listMemories(req, res);
    if (url.pathname === '/api/memories' && req.method === 'POST') return await createMemory(req, res);
    const match = url.pathname.match(/^\/api\/memories\/([\w-]+)$/);
    if (match && req.method === 'DELETE') return await deleteMemory(req, res, match[1]);
    if (url.pathname === '/api/notes' && req.method === 'GET') return await listNotes(req, res);
    if (url.pathname === '/api/notes' && req.method === 'POST') return await createNote(req, res);
    if (url.pathname.startsWith('/api/')) return sendError(res, 404, 'Ruta API no encontrada.');
    const media = url.pathname.match(/^\/media\/([\da-f-]+\.(?:jpg|png|webp))$/i);
    if (media && req.method === 'GET') {
      const extension = extname(media[1]).toLowerCase();
      const content = await readFile(join(DATA_DIR, 'uploads', media[1]));
      res.writeHead(200, { 'Content-Type': { '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[extension], 'Cache-Control': 'public, max-age=31536000, immutable' });
      return res.end(content);
    }

    const requested = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
    const target = normalize(join(PUBLIC_DIR, requested));
    if (!target.startsWith(PUBLIC_DIR)) return sendError(res, 403, 'Ruta no permitida.');
    try {
      const content = await readFile(target);
      res.writeHead(200, { 'Content-Type': mime[extname(target)] || 'application/octet-stream' });
      return res.end(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        const html = await readFile(join(PUBLIC_DIR, 'index.html'));
        res.writeHead(200, { 'Content-Type': mime['.html'] });
        return res.end(html);
      }
      throw error;
    }
  } catch (error) { handleError(res, error); }
}
