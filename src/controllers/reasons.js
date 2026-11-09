import { readCollection } from '../services/json-store.js';
import { sendJson } from '../utils/response.js';
export async function listReasons(_req, res) {
  sendJson(res, 200, (await readCollection('reasons')).map(({ text }) => text));
}
