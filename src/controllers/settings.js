import { HER_NAME, START_DATE } from '../config.js';
import { sendJson } from '../utils/response.js';
export function getSettings(_req, res) {
  sendJson(res, 200, { herName: HER_NAME, startDate: START_DATE, title: 'Nuestro pequeño universo' });
}
