export function applyGrayscale(active) {
  document.body.style.filter = active ? 'grayscale(100%)' : '';
}