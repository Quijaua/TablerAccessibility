export function initToolbar(instance, options) {
  const config = options || {};

  const position = ['bottom-right', 'bottom-left', 'top-right', 'top-left']
    .includes(config.position) ? config.position : 'bottom-right';

  const container = document.createElement('div');
  container.className = `a11y-container a11y-${position}`;
  const toggleButton = document.createElement('button');
  const menu = document.createElement('div');

  const menuIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
         class="icon icon-tabler icons-tabler-outline icon-tabler-disabled-2">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M17 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M9 11a5 5 0 1 0 3.95 7.95" />
      <path d="M19 20l-4 -5h-4l3 -5l-4 -3l-4 1" />
    </svg>`;

  const closeIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
         class="icon icon-tabler icons-tabler-outline icon-tabler-x">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>`;

  toggleButton.className = `btn btn-floating btn-icon btn-primary ${position}`;
  toggleButton.innerHTML = menuIcon;

  // Configuração do menu
  menu.className = `a11y-menu ${position}`;
  menu.style.cssText = `
    position: fixed;
    display: none;
    z-index: 9999;
    min-width: 200px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;

  // Posicionamento inicial
  const positionStyles = {
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' }
  };

  Object.assign(toggleButton.style, positionStyles[position]);
  Object.assign(menu.style, positionStyles[position]);

  // Itens do menu
  const menuItems = [
    { 
      label: 'Tamanho do Texto', 
      setting: 'textSize',
      update: (btn, inst) => {
        btn.querySelector('.badge').textContent = inst.settings.textSizeLevel;
      }
    },
    { label: 'Fonte Dislexia', setting: 'dyslexiaFont' },
    { label: 'Escala de Cinza', setting: 'grayscale' },
    { label: 'Alto Contraste', setting: 'highContrast' },
    { label: 'Ocultar Imagens', setting: 'hideImages' }
  ];

  menuItems.forEach(item => {
    const button = document.createElement('button');
    button.className = 'a11y-menu-item';
    button.innerHTML = `
      <span>${item.label}</span>
      ${item.setting === 'textSize' ? '<span class="badge bg-dark-lt level ms-2">0</span>' : ''}
    `;

    button.addEventListener('click', () => {
      instance.toggleSetting(item.setting);
      if (item.update) item.update(button, instance);
    });

    menu.appendChild(button);
  });

  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.style.display === 'block';
    toggleButton.innerHTML = isOpen ? menuIcon : closeIcon;
    menu.style.display = isOpen ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      toggleButton.innerHTML = menuIcon;
      menu.style.display = 'none';
    }
  });

  container.appendChild(toggleButton);
  container.appendChild(menu);
  document.body.appendChild(container);
}