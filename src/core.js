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
  }

  saveSettings() {
    localStorage.setItem('tabler-a11y-settings', JSON.stringify(this.settings));
  }

  applyAll() {
    Object.entries(this.settings).forEach(([key, value]) => {
      this.applyFunctions[key](value);
    });
  }

  toggleSetting(setting) {
    if (setting === 'textSize') {
      this.settings.textSizeLevel = (this.settings.textSizeLevel + 1) % 5;
    } else {
      this.settings[setting] = !this.settings[setting];
    }
    this.saveSettings();
    this.applyAll();
  }
}

export default TablerA11y;