// TMNT: Splintered Fate — Mobile App UI
// Orchestrates mobile experience: character picker, bottom nav, panel switching

import { characters } from '../data/characters.js';
import { state, selectCharacter, setActiveTab, on } from '../state.js';
import { renderSidebar } from './sidebar.js';

const MOBILE_BREAKPOINT = 600;
let isMobile = false;
let currentPanel = 'powers';
let buildSubTab = 'powers'; // track Powers vs Tools within Build

// ---- Bottom Nav Items ----

const NAV_ITEMS = [
  {
    id: 'powers', label: 'Build',
    icon: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>`
  },
  {
    id: 'upgrades', label: 'HQ',
    icon: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 20V10M6 20V4M18 20v-6"/>
    </svg>`
  },
  {
    id: 'artifacts', label: 'Artifacts',
    icon: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/>
    </svg>`
  },
  {
    id: 'inspirations', label: 'Inspire',
    icon: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`
  },
  {
    id: 'summary', label: 'Summary',
    icon: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>`
  }
];

// ---- Public API ----

export function initMobile() {
  isMobile = checkMobile();
  if (!isMobile) return;

  document.body.classList.add('mobile-app');
  injectCharacterPicker();
  injectBottomNav();
  injectCharIndicator();
  setupMobileListeners();

  // Character-first flow
  if (!state.character) {
    showCharacterPicker();
  } else {
    hideCharacterPicker();
    activatePanel(state.activeTab);
  }
}

// ---- Detection ----

function checkMobile() {
  return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
}

// ---- Character Picker ----

function injectCharacterPicker() {
  if (document.getElementById('mobile-char-picker')) return;

  const picker = document.createElement('div');
  picker.className = 'mobile-char-picker hidden';
  picker.id = 'mobile-char-picker';
  picker.innerHTML = `
    <div class="mobile-char-picker-title">Choose Your Turtle</div>
    <div class="mobile-char-grid">
      ${characters.map(c => `
        <div class="mobile-char-cell ${state.character === c.id ? 'active' : ''}"
             data-character="${c.id}">
          <img src="assets/faces/${c.id}.png" alt="${c.name}">
          <span>${c.name}</span>
        </div>
      `).join('')}
    </div>
  `;
  document.body.appendChild(picker);

  picker.querySelectorAll('.mobile-char-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      selectCharacter(cell.dataset.character);
    });
  });
}

function showCharacterPicker() {
  const picker = document.getElementById('mobile-char-picker');
  const nav = document.getElementById('mobile-bottom-nav');
  if (picker) picker.classList.remove('hidden');
  if (nav) nav.classList.add('hidden');
}

function hideCharacterPicker() {
  const picker = document.getElementById('mobile-char-picker');
  const nav = document.getElementById('mobile-bottom-nav');
  if (picker) picker.classList.add('hidden');
  if (nav) nav.classList.remove('hidden');
}

function updateCharacterPicker() {
  const picker = document.getElementById('mobile-char-picker');
  if (!picker) return;
  picker.querySelectorAll('.mobile-char-cell').forEach(cell => {
    cell.classList.toggle('active', cell.dataset.character === state.character);
  });
}

// ---- Character Indicator (topbar) ----

function injectCharIndicator() {
  if (document.getElementById('mobile-char-indicator')) return;

  const topbar = document.getElementById('topbar');
  const right = topbar.querySelector('.topbar-right');
  const indicator = document.createElement('div');
  indicator.className = 'mobile-char-indicator';
  indicator.id = 'mobile-char-indicator';
  updateCharIndicator(indicator);
  topbar.insertBefore(indicator, right);

  indicator.addEventListener('click', () => showCharacterPicker());
}

function updateCharIndicator(el) {
  const indicator = el || document.getElementById('mobile-char-indicator');
  if (!indicator) return;
  const char = characters.find(c => c.id === state.character);
  if (char) {
    indicator.innerHTML = `
      <img src="assets/faces/${char.id}.png" alt="${char.name}">
      <span>${char.name}</span>
    `;
  } else {
    indicator.innerHTML = `<span style="color: var(--text-tertiary)">Select...</span>`;
  }
}

// ---- Bottom Navigation ----

function injectBottomNav() {
  if (document.getElementById('mobile-bottom-nav')) return;

  const nav = document.createElement('nav');
  nav.className = 'mobile-bottom-nav';
  nav.id = 'mobile-bottom-nav';
  renderBottomNav(nav);
  document.body.appendChild(nav);
}

function renderBottomNav(navEl) {
  const nav = navEl || document.getElementById('mobile-bottom-nav');
  if (!nav) return;

  nav.innerHTML = NAV_ITEMS.map(item => `
    <button class="mobile-nav-item ${currentPanel === item.id ? 'active' : ''}"
            data-nav="${item.id}">
      ${item.icon}
      <span>${item.label}</span>
    </button>
  `).join('');

  nav.querySelectorAll('.mobile-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.dataset.nav);
    });
  });
}

function updateNavActiveState() {
  const nav = document.getElementById('mobile-bottom-nav');
  if (!nav) return;
  nav.querySelectorAll('.mobile-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === currentPanel);
  });
}

// ---- Panel Navigation ----

function navigateTo(navId) {
  currentPanel = navId;

  const browsePanel = document.getElementById('browse-panel');
  const sidebar = document.getElementById('sidebar');

  if (navId === 'summary') {
    // Show sidebar as full-screen panel
    browsePanel.classList.add('mobile-panel-hidden');
    sidebar.classList.add('mobile-panel-active');
    sidebar.classList.remove('open');
    // Force re-render so stats reflect current upgrade state
    renderSidebar();
  } else {
    // Show browse panel
    browsePanel.classList.remove('mobile-panel-hidden');
    sidebar.classList.remove('mobile-panel-active');

    // Map nav to actual tab
    if (navId === 'powers') {
      setActiveTab(buildSubTab); // powers or tools
    } else {
      setActiveTab(navId);
    }
  }

  updateNavActiveState();
  animatePanel();
}

function activatePanel(tabId) {
  // Map tab to nav item
  const navMap = {
    powers: 'powers',
    tools: 'powers',
    artifacts: 'artifacts',
    inspirations: 'inspirations',
    upgrades: 'upgrades',
    masteries: 'upgrades'
  };
  currentPanel = navMap[tabId] || 'powers';
  navigateTo(currentPanel);
}

function animatePanel() {
  const target = currentPanel === 'summary'
    ? document.getElementById('sidebar')
    : document.getElementById('browse-panel');
  if (!target) return;
  target.classList.remove('mobile-panel-enter');
  void target.offsetWidth; // force reflow
  target.classList.add('mobile-panel-enter');
}

// ---- Build Sub-Toggle (Powers / Tools) ----

function injectBuildSubToggle() {
  if (!isMobile) return;
  const tab = state.activeTab;
  if (tab !== 'powers' && tab !== 'tools') return;

  const filterBar = document.getElementById('filter-bar');
  if (!filterBar) return;
  if (filterBar.querySelector('.mobile-build-toggle')) return;

  const toggle = document.createElement('div');
  toggle.className = 'mobile-build-toggle view-toggle';
  toggle.style.marginBottom = 'var(--sp-2)';
  toggle.innerHTML = `
    <button class="view-toggle-btn ${tab === 'powers' ? 'active' : ''}" data-build-sub="powers">Powers</button>
    <button class="view-toggle-btn ${tab === 'tools' ? 'active' : ''}" data-build-sub="tools">Tools</button>
  `;
  filterBar.prepend(toggle);

  toggle.querySelectorAll('[data-build-sub]').forEach(btn => {
    btn.addEventListener('click', () => {
      buildSubTab = btn.dataset.buildSub;
      setActiveTab(buildSubTab);
      currentPanel = 'powers';
      updateNavActiveState();
    });
  });
}

// ---- HQ Filter Bar Patching ----

function patchHQFilterBar() {
  if (!isMobile || state.activeTab !== 'upgrades') return;

  const filterBar = document.getElementById('filter-bar');
  if (!filterBar) return;

  // Remove Artifacts + Inspirations redirect pills (they have their own nav items)
  filterBar.querySelectorAll('[data-section="artifacts"], [data-section="inspirations"]').forEach(el => el.remove());

  // Add Masteries pill if not present
  const group = filterBar.querySelector('.filter-group');
  if (group && !group.querySelector('[data-section="masteries"]')) {
    const settingsBtn = group.querySelector('[data-section="settings"]');
    const btn = document.createElement('button');
    btn.className = 'filter-pill';
    btn.dataset.section = 'masteries';
    btn.textContent = 'Masteries';
    btn.addEventListener('click', () => {
      setActiveTab('masteries');
      currentPanel = 'upgrades';
      updateNavActiveState();
    });
    // Insert before Settings
    if (settingsBtn) {
      group.insertBefore(btn, settingsBtn);
    } else {
      group.appendChild(btn);
    }
  }
}

// ---- Event Listeners ----

function setupMobileListeners() {
  on('character-changed', () => {
    if (!isMobile) return;
    updateCharIndicator();
    updateCharacterPicker();
    if (state.character) {
      hideCharacterPicker();
    }
  });

  on('tab-changed', (tab) => {
    if (!isMobile) return;

    // Sync bottom nav when tab changes programmatically
    const navMap = {
      powers: 'powers',
      tools: 'powers',
      artifacts: 'artifacts',
      inspirations: 'inspirations',
      upgrades: 'upgrades',
      masteries: 'upgrades'
    };
    const navId = navMap[tab] || 'powers';

    if (navId !== currentPanel) {
      currentPanel = navId;
      updateNavActiveState();

      // Ensure correct panel visibility
      const browsePanel = document.getElementById('browse-panel');
      const sidebar = document.getElementById('sidebar');
      browsePanel.classList.remove('mobile-panel-hidden');
      sidebar.classList.remove('mobile-panel-active');
    }

    // Track build sub-tab
    if (tab === 'powers' || tab === 'tools') {
      buildSubTab = tab;
    }

    // Inject sub-toggles after tab module finishes rendering
    setTimeout(() => {
      injectBuildSubToggle();
      patchHQFilterBar();
    }, 0);
  });

  // Handle resize / orientation change
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  mql.addEventListener('change', (e) => {
    if (e.matches && !isMobile) {
      isMobile = true;
      initMobile();
    } else if (!e.matches && isMobile) {
      teardownMobile();
    }
  });
}

// ---- Teardown ----

function teardownMobile() {
  isMobile = false;
  document.body.classList.remove('mobile-app');
  document.getElementById('mobile-char-picker')?.remove();
  document.getElementById('mobile-bottom-nav')?.remove();
  document.getElementById('mobile-char-indicator')?.remove();

  // Restore panel visibility
  const browsePanel = document.getElementById('browse-panel');
  const sidebar = document.getElementById('sidebar');
  if (browsePanel) browsePanel.classList.remove('mobile-panel-hidden');
  if (sidebar) sidebar.classList.remove('mobile-panel-active');
}
