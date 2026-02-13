// TMNT: Splintered Fate - Top Bar UI
// Character selector, theme toggle, settings button

import { characters, characterThemeMap } from '../data/characters.js';
import { state, settings, selectCharacter, setThemeMode, on } from '../state.js';

export function initTopbar() {
  renderCharacterSelector();
  initThemeToggle();
  initSettingsButton();

  on('character-changed', () => {
    renderCharacterSelector();
    applyTheme();
  });
  on('settings-changed', () => {
    applyTheme();
    updateThemeToggleVisibility();
  });

  applyTheme();
  updateThemeToggleVisibility();
}

function renderCharacterSelector() {
  const container = document.getElementById('character-selector');
  if (!container) return;

  container.innerHTML = characters.map(char => `
    <button class="char-btn ${state.character === char.id ? 'active' : ''}"
            data-character="${char.id}">
      ${char.name}
    </button>
  `).join('');

  container.querySelectorAll('.char-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectCharacter(btn.dataset.character);
    });
  });
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const newMode = settings.themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
  });
}

function updateThemeToggleVisibility() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  // Hide theme toggle when auto-theme is on and a character is selected
  if (settings.autoTheme && state.character) {
    btn.style.display = 'none';
  } else {
    btn.style.display = '';
  }
}

function initSettingsButton() {
  const btn = document.getElementById('settings-btn');
  const modal = document.getElementById('upgrades-modal');
  const closeBtn = document.getElementById('close-upgrades');

  if (btn && modal) {
    btn.addEventListener('click', () => {
      modal.classList.add('open');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }
}

export function applyTheme() {
  const html = document.documentElement;

  if (settings.autoTheme && state.character) {
    const theme = characterThemeMap[state.character];
    if (theme) {
      html.setAttribute('data-theme', theme);
      return;
    }
  }

  html.setAttribute('data-theme', settings.themeMode);
}
