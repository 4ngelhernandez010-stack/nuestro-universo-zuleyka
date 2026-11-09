import { api } from '../api.js';
const defaults = [
  'Porque a su lado los días normales se sienten como una aventura.',
  'Por su risa, que siempre encuentra el camino hasta mí.',
  'Porque a su lado hasta el silencio se siente acompañado.',
  'Por la forma bonita en que mira el mundo.',
  'Porque ser su persona favorita es mi lugar preferido.',
  'Porque el 23 de junio me animé a decirle cuánto me gustaba.',
  'Por todos los sueños que todavía nos quedan por cumplir.',
  'Simplemente porque es usted, Zuleyka. Y eso lo cambia todo.'
];
let reasons = defaults;
let remaining = [];
let last = '';
const text = document.querySelector('#reason-text');
const button = document.querySelector('#new-reason');
const shuffle = (items) => {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [items[index], items[other]] = [items[other], items[index]];
  }
  return items;
};
remaining = shuffle([...reasons]);
api.reasons().then((items) => {
  if (items.length) { reasons = items; remaining = shuffle([...reasons]); }
}).catch(() => {}).finally(() => { button.disabled = false; });
button.disabled = true;
button.addEventListener('click', () => {
  if (!remaining.length) {
    remaining = shuffle([...reasons]);
    if (remaining.length > 1 && remaining.at(-1) === last) [remaining[0], remaining[remaining.length - 1]] = [remaining[remaining.length - 1], remaining[0]];
  }
  const next = remaining.pop();
  last = next;
  text.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 420, easing: 'ease-out' });
  text.textContent = next;
});
