export function applyTextSize(level) {
  const sizes = {
    body: [0.875, 1, 1.25, 1.5, 1.75],
    headings: {
      h1: [1.5, 1.75, 2.0, 2.25, 2.5],
      h2: [1.25, 1.5, 1.75, 2.0, 2.25],
      h3: [1.0, 1.25, 1.5, 1.75, 2.0],
      h4: [0.875, 1.0, 1.25, 1.5, 1.75],
      h5: [0.75, 0.875, 1.0, 1.25, 1.5],
      h6: [0.625, 0.75, 0.875, 1.0, 1.25]
    }
  };

  const root = document.documentElement;
  
  // Aplica tamanho do corpo
  root.style.setProperty('--tblr-body-font-size', `${sizes.body[level]}rem`);

  // Aplica tamanhos dos títulos
  Object.entries(sizes.headings).forEach(([key, values]) => {
    root.style.setProperty(`--tblr-font-size-${key}`, `${values[level]}rem`);
  });
}