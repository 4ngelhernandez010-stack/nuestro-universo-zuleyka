import { api } from '../api.js';
import { toast } from '../components/toast.js';
const list = document.querySelector('#memory-list');
const dialog = document.querySelector('#memory-dialog');
const form = document.querySelector('#memory-form');
const dateLabel = (date) => date ? new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`)) : 'Un día especial';
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
function render(items) {
  if (!items.length) { list.innerHTML = '<div class="loading-card">Todavía no guardamos nuestro primer recuerdo. <span>♡</span></div>'; return; }
  list.innerHTML = items.map((item) => {
    const icon = item.image ? `<img class="memory-thumb" src="${escapeHtml(item.image)}" alt="Foto de ${escapeHtml(item.title)}" />` : escapeHtml(item.emoji || '💌');
    return `<article class="memory-item"><div class="memory-icon">${icon}</div><div><h3>${escapeHtml(item.title)}</h3><div class="memory-meta">${escapeHtml(dateLabel(item.date))}${item.place ? ` · ${escapeHtml(item.place)}` : ''}</div><p>${escapeHtml(item.note)}</p></div><button class="memory-delete" data-delete="${escapeHtml(item.id)}" aria-label="Quitar recuerdo">×</button></article>`;
  }).join('');
}
async function prepareImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('Seleccione un archivo de imagen.');
  let bitmap;
  try { bitmap = await createImageBitmap(file); }
  catch { throw new Error('No se pudo abrir la foto. Elija otra imagen.'); }
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext('2d');
  context.fillStyle = '#fffdf9';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/jpeg', 0.82);
}
export async function loadMemories() {
  try { render(await api.memories()); }
  catch { list.innerHTML = '<div class="loading-card">No se pudo conectar con la cápsula. <span>♡</span></div>'; }
}
document.querySelector('.add-memory-open').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
list.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-delete]');
  if (!button) return;
  try { await api.deleteMemory(button.dataset.delete); await loadMemories(); toast('Recuerdo retirado de la cápsula.'); }
  catch (error) { toast(error.message); }
});
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const fields = Object.fromEntries(new FormData(form));
  try {
    if (fields.image?.size) fields.image = await prepareImage(fields.image);
    else delete fields.image;
    await api.addMemory(fields);
    form.reset(); dialog.close(); await loadMemories(); toast('Un recuerdo bonito quedó guardado. ✨');
  } catch (error) { toast(error.message); }
});
