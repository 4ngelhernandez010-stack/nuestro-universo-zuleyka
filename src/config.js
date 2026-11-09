import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const PORT = Number(process.env.PORT || 3000);
export const DATA_DIR = path.join(root, 'data');
export const PUBLIC_DIR = path.join(root, 'public');
export const APP_ORIGIN = process.env.APP_ORIGIN || '*';
export const START_DATE = process.env.SPECIAL_DATE || '23 de junio';
export const HER_NAME = process.env.HER_NAME || 'Zuleyka';
