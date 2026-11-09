import { toast } from '../components/toast.js';
const envelope = document.querySelector('#letter-envelope');
const button = document.querySelector('#open-letter');
button.addEventListener('click', () => {
  const open = envelope.classList.toggle('open');
  button.innerHTML = open ? 'Cerrar la cartita <span>↙</span>' : 'Abrir la cartita <span>↗</span>';
  if (open) {
    toast('Una cartita solo para usted, Zuleyka. 💌');
    const burst = document.querySelector('#heart-burst');
    for (let i = 0; i < 12; i += 1) {
      const heart = document.createElement('span');
      heart.className = 'burst-heart'; heart.textContent = i % 2 ? '♡' : '♥';
      heart.style.left = `${44 + Math.random() * 12}%`; heart.style.top = `${58 + Math.random() * 9}%`;
      heart.style.animationDelay = `${Math.random() * .45}s`; burst.append(heart);
      setTimeout(() => heart.remove(), 2000);
    }
  }
});
