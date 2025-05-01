import { applyTextSize } from './textSize.js';
import { applyDyslexiaFont } from './dyslexiaFont.js';
import { applyGrayscale } from './grayscale.js';
import { applyHighContrast } from './highContrast.js';
import { applyHideImages } from './hideImages.js';
import { initToolbar } from './toolbar.js';
import { initShortcuts } from './shortcuts.js';
import { defaultConfig } from './config.js';

class TablerA11y {
  constructor(userOptions = {}) {
    // Configurações padrão
    const defaultOptions = {
      position: 'bottom-right'
    };

    this.options = { ...defaultOptions, ...userOptions };

    this.applyFunctions = {
      'textSizeLevel': (level) => applyTextSize(level),
      'dyslexiaFont': (active) => applyDyslexiaFont(active),
      'grayscale': (active) => applyGrayscale(active),
      'highContrast': (active) => applyHighContrast(active),
      'hideImages': (active) => applyHideImages(active)
    };

    this.settings = Object.keys(this.applyFunctions).reduce((acc, key) => {
      acc[key] = key === 'textSizeLevel' ? 0 : false;
      return acc;
    }, {});

    this.toggleSetting = this.toggleSetting.bind(this);
    this.init();

    this.applyAll = this.applyAll.bind(this);
  }

  init() {
    this.loadSettings();
    this.applyAll();
    initToolbar(this, this.options);
    initShortcuts(this);
  }

  loadSettings() {
    const saved = localStorage.getItem('tabler-a11y-settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Filtra apenas chaves válidas
      Object.keys(parsed).forEach(key => {
        if (this.applyFunctions.hasOwnProperty(key)) {
          this.settings[key] = parsed[key];
        }
      });
    }
    this.applyAll();
  }

  saveSettings() {
    localStorage.setItem('tabler-a11y-settings', JSON.stringify(this.settings));
  }

  applyAll() {
    Object.entries(this.settings).forEach(([key, value]) => {
      if(key !== 'reset') {
        this.applyFunctions[key](value);
      }
    });
  }

  toggleSetting(setting) {
    if (setting === 'textSizeLevel') {
      this.settings.textSizeLevel = (this.settings.textSizeLevel + 1) % 5;
      this.updateTextSizeBadge();
    } else {
      this.settings[setting] = !this.settings[setting];
    }
    
    this.saveSettings();
    this.applyAll();
  }

  updateTextSizeBadge() {
    const badges = document.querySelectorAll('.a11y-menu-item .level');
    badges.forEach(badge => {
      badge.textContent = this.settings.textSizeLevel;
    });
  }

  resetSettings() {
    // Valores padrão
    this.settings = {
      textSizeLevel: 0,
      dyslexiaFont: false,
      grayscale: false,
      highContrast: false,
      hideImages: false
    };
    
    // Limpa o localStorage
    localStorage.removeItem('tabler-a11y-settings');
    
    // Reaplica os padrões
    this.applyAll();
    
    // Atualiza a UI
    this.updateTextSizeBadge();
    this.updateActiveStates();
  }

  updateActiveStates() {
    document.querySelectorAll('.a11y-menu-item').forEach(button => {
      const setting = button.dataset.setting;
      if(setting && setting !== 'textSizeLevel' && setting !== 'reset') {
        button.classList.toggle('active', this.settings[setting]);
      }
    });
  }
}

export default TablerA11y;