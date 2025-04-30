export function applyHideImages(active) {
  document.querySelectorAll('img').forEach(img => {
    img.style.visibility = active ? 'hidden' : 'visible';
  });
}