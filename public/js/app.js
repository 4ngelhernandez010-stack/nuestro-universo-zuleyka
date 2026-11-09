import './components/nav.js';
import { loadMemories } from './views/memories.js';
import { loadNotes } from './views/notes.js';
import './views/reasons.js';
import './views/letter.js';

const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
  });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal,.hero-copy,.hero-art').forEach((element) => reveal.observe(element));
loadMemories();
loadNotes();
