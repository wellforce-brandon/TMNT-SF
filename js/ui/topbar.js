// TMNT: Splintered Fate - Top Bar UI
// Character selector, theme toggle, settings button, auth

import { characters, characterThemeMap } from '../data/characters.js';
import { state, settings, selectCharacter, setThemeMode, setActiveTab, on } from '../state.js';
import { setSection } from './upgrades-tab.js';
import { isLoggedIn, getUser, loginWithDiscord, logout, onAuthChanged } from '../supabase.js';

export function initTopbar() {
  renderCharacterSelector();
  renderAuthButton();
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

  // Re-render auth button when login state changes
  onAuthChanged(() => renderAuthButton());

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

function renderAuthButton() {
  const container = document.getElementById('auth-container');
  if (!container) return;

  if (isLoggedIn()) {
    const user = getUser();
    const avatarUrl = user?.user_metadata?.avatar_url;
    const username = user?.user_metadata?.full_name || user?.user_metadata?.name || 'User';

    container.innerHTML = `
      <div class="auth-user">
        ${avatarUrl ? `<img class="auth-avatar" src="${avatarUrl}" alt="${username}" title="${username}">` : ''}
        <button class="btn btn-small btn-ghost" id="logout-btn">Sign Out</button>
      </div>
    `;

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => logout());
    }
  } else {
    container.innerHTML = `
      <button class="btn btn-small btn-discord" id="discord-login-btn">
        <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Sign In
      </button>
    `;

    const loginBtn = document.getElementById('discord-login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => loginWithDiscord());
    }
  }
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
      setSection('settings');
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
