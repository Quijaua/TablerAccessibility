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

  const menuItems = [
    { 
      label: 'Tamanho do Texto', 
      setting: 'textSizeLevel',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-text-size"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7v-2h13v2" /><path d="M10 5v14" /><path d="M12 19h-4" /><path d="M15 13v-1h6v1" /><path d="M18 12v7" /><path d="M17 19h2" /></svg>`,
      update: (btn, inst) => {
        btn.querySelector('.level').textContent = inst.settings.textSizeLevel;
      }
    },
    { 
      label: 'Fonte Dislexia', 
      setting: 'dyslexiaFont',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-letter-case"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.5 15.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" /><path d="M3 19v-10.5a3.5 3.5 0 0 1 7 0v10.5" /><path d="M3 13h7" /><path d="M21 12v7" /></svg>`
    },
    { 
      label: 'Escala de Cinza', 
      setting: 'grayscale',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-droplet-half"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2l.07 .003a2.41 2.41 0 0 1 1.825 .907l.108 .148l4.92 7.306c1.952 3.267 1.191 7.42 -1.796 9.836c-2.968 2.402 -7.285 2.402 -10.254 0c-2.917 -2.36 -3.711 -6.376 -1.901 -9.65l.134 -.232l4.893 -7.26c.185 -.275 .426 -.509 .709 -.686a2.426 2.426 0 0 1 1.066 -.36l.226 -.012zm-1 3.149l-4.206 6.24c-1.44 2.41 -.88 5.463 1.337 7.257a6.101 6.101 0 0 0 2.869 1.276v-14.773z" /></svg>`
    },
    { 
      label: 'Alto Contraste', 
      setting: 'highContrast',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-contrast"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-9 1.732a8 8 0 0 0 4.001 14.928l-.001 -16a8 8 0 0 0 -4 1.072" /></svg>`
    },
    { 
      label: 'Ocultar Imagens', 
      setting: 'hideImages',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-photo-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01" /><path d="M7 3h11a3 3 0 0 1 3 3v11m-.856 3.099a2.991 2.991 0 0 1 -2.144 .901h-12a3 3 0 0 1 -3 -3v-12c0 -.845 .349 -1.608 .91 -2.153" /><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" /><path d="M16.33 12.338c.574 -.054 1.155 .166 1.67 .662l3 3" /><path d="M3 3l18 18" /></svg>`
    },
    { 
      label: 'Redefinir Tudo', 
      setting: 'reset',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-rotate"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" /></svg>`
    }
  ];

  menuItems.forEach(item => {
    const button = document.createElement('button');
    button.className = 'a11y-menu-item';
    button.innerHTML = `
      ${item.icon}
      <span class="a11y-label">${item.label}</span>
      ${item.setting === 'textSizeLevel' ? '<span class="badge">Nível <span class="level">0</span></span>' : ''}
    `;

    button.addEventListener('click', () => {
      if(item.setting === 'reset') {
        if(confirm('Tem certeza que deseja redefinir todas as configurações?')) {
          instance.resetSettings();
        }
      } else {
        instance.toggleSetting(item.setting);
        if (item.setting !== 'textSizeLevel') {
          button.classList.toggle('active', instance.settings[item.setting]);
        }
      }

      button.dataset.setting = item.setting;
    });
  
    // Atualização inicial
    if (item.setting === 'textSizeLevel' && item.update) {
      item.update(button, instance);
    }
  
    menu.appendChild(button);
  });

  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.style.display === 'grid';
    toggleButton.innerHTML = isOpen ? menuIcon : closeIcon;
    menu.style.display = isOpen ? 'none' : 'grid';
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