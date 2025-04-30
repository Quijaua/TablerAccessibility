export function applyDyslexiaFont(active) {
  if (active) {
    const style = document.createElement('style');
    style.id = 'dyslexia-font';
    style.textContent = `
      @import url('https://fonts.cdnfonts.com/css/open-dyslexic');
      body {
        font-family: 'Open-Dyslexic', sans-serif !important;
      }
    `;
    document.head.appendChild(style);
  } else {
    document.body.style.fontFamily = '';
    const style = document.getElementById('dyslexia-font');
    if (style) style.remove();
  }
}