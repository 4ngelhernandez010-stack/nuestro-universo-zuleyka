import { updateCollection, readCollection } from './json-store.js';
import { makeId } from '../utils/id.js';

const reasonOpeners = [
  'Me encanta cómo usted', 'Admiro cómo usted', 'Me alegra ver cómo usted',
  'Me fascina cómo usted', 'No dejo de admirar cómo usted', 'Me hace feliz notar cómo usted',
  'Qué bonito es ver cómo usted', 'Me quedo pensando en cómo usted',
  'Cada día aprecio más cómo usted', 'Siempre me sorprende cómo usted'
];
const reasonActions = [
  'sonríe cuando algo le hace ilusión', 'escucha con atención hasta los detalles más pequeños',
  'mira el mundo con tanta ternura', 'habla con cariño de las personas que quiere',
  'se emociona con las cosas que le apasionan', 'encuentra belleza en los detalles cotidianos',
  'se mantiene auténtica en cualquier momento', 'se preocupa por cómo se sienten los demás',
  'comparte conmigo las cosas que le gustan', 'usa su sentido del humor para alegrar cualquier día'
];
const reasonEndings = [
  'me ayuda a encontrar belleza hasta en los días más corrientes',
  'convierte un momento sencillo en un recuerdo que quiero guardar',
  'me recuerda lo afortunado que soy de conocerla',
  'hace que cada conversación con usted se sienta especial',
  'me inspira a tratar a los demás con más cariño',
  'deja una alegría que me acompaña por el resto del día',
  'hace que siempre quiera escuchar un poquito más',
  'me devuelve la sonrisa sin siquiera intentarlo',
  'me permite admirarla un poquito más',
  'me hace pensar en todas las cosas bonitas que aún nos esperan'
];

export function generateReasons() {
  return reasonOpeners.flatMap((opener) => reasonActions.flatMap((action) =>
    reasonEndings.map((ending) => `${opener} ${action}, y ${ending}.`)
  ));
}

export async function seedData() {
  if (!(await readCollection('memories')).length) await updateCollection('memories', () => [
    { id: makeId(), title: 'El día que me declaré', date: null, place: '23 de junio', note: 'Ya sabía que era su cumpleaños y elegí ese día a propósito. No se me ocurría una fecha mejor para decirle cuánto me gustaba. ✨\n\nY todavía tenemos pendiente nuestra foto juntos. Cuando la hagamos, no dude en guardarla aquí para que también forme parte de nuestros recuerdos.', emoji: '🌙' }
  ]);
  if (!(await readCollection('reasons')).length) await updateCollection('reasons', () => generateReasons().map((text) => ({ id: makeId(), text })));
  if (!(await readCollection('notes')).length) await updateCollection('notes', () => []);
}
