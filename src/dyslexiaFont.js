export function applyDyslexiaFont(active) {
  const styleId = 'dyslexia-font-style';
  let style = document.getElementById(styleId);

  if (active) {
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('/fonts/OpenDyslexic/OpenDyslexic-Bold.woff2') format('woff2'),
               url('/fonts/OpenDyslexic/OpenDyslexic-Bold.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        body {
          font-family: 'OpenDyslexic', sans-serif !important;
        }
      `;
      document.head.appendChild(style);
    }
  } else {
    if (style) {
      document.head.removeChild(style);
      document.body.style.fontFamily = '';
    }
  }
}