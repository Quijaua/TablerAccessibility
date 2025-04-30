export function initShortcuts(instance) {
  document.addEventListener('keydown', (e) => {
    if (e.altKey) {
      switch(e.key.toLowerCase()) {
        case 't': instance.toggleSetting('textSize'); break;
        case 'f': instance.toggleSetting('dyslexiaFont'); break;
        case 'g': instance.toggleSetting('grayscale'); break;
        case 'c': instance.toggleSetting('highContrast'); break;
        case 'i': instance.toggleSetting('hideImages'); break;
      }
    }
  });
}