const element = document.querySelector('#toast');
let timer;
export function toast(message) {
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(timer);
  timer = setTimeout(() => element.classList.remove('show'), 2600);
}
