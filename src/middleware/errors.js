import { sendError } from '../utils/response.js';
export function handleError(res, error) {
  console.error(error);
  sendError(res, error.status || 500, error.status ? error.message : 'Algo salió mal. Inténtelo de nuevo.');
}
