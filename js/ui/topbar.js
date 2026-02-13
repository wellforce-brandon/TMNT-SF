// TMNT: Splintered Fate - Top Bar UI
// Character selector, theme toggle, settings button

import { characters, characterThemeMap } from '../data/characters.js';
import { state, settings, selectCharacter, setThemeMode, setActiveTab, on } from '../state.js';

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
      <img class="char-btn-portrait" src="assets/faces/${char.id}.png" alt="${char.name}">
      <span class="char-btn-name">${char.name}</span>
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
  // Toggle is always visible — it switches between light/dark variants
}

function initSettingsButton() {
  const btn = document.getElementById('settings-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      setActiveTab('upgrades');
    });
  }
}

export function applyTheme() {
  const html = document.documentElement;

  if (settings.autoTheme && state.character) {
    const themeMap = characterThemeMap[state.character];
    if (themeMap) {
      html.setAttribute('data-theme', themeMap[settings.themeMode]);
      return;
    }
  }

  html.setAttribute('data-theme', settings.themeMode);
}
