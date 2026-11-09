import { api } from '../api.js';
import { toast } from '../components/toast.js';
const list = document.querySelector('#note-list');
const input = document.querySelector('#note-input');
const count = document.querySelector('#char-count');
const storageHint = document.createElement('p');
storageHint.className = 'storage-note';
storageHint.textContent = 'Sus notas y recuerdos se guardan en este navegador; no se sincronizan con otros dispositivos.';
list.after(storageHint);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
const dateLabel = (value) => new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' }).format(new Date(value));
input.addEventListener('input', () => { count.textContent = `${input.value.length} / 500`; });
export async function loadNotes() {
  try {
    const notes = await api.notes();
    list.innerHTML = notes.length ? notes.map((note) => `<article class="note-item"><span class="mood">${escapeHtml(note.mood)}</span><p>${escapeHtml(note.text)}</p><time>${escapeHtml(dateLabel(note.createdAt))}</time></article>`).join('') : '<p class="empty-note">Todavía no hay notitas. Guarde la primera cuando guste. 💌</p>';
  } catch { list.innerHTML = '<p class="empty-note">Sus notitas aparecerán aquí cuando la cápsula esté conectada. 💌</p>'; }
}
document.querySelector('#note-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    await api.addNote(input.value, '💗');
    input.value = ''; count.textContent = '0 / 500'; await loadNotes(); toast('Su notita ya está aquí. 💌');
  } catch (error) { toast(error.message); }
});
