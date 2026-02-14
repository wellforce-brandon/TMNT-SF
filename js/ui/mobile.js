// TMNT: Splintered Fate — Mobile App UI
// Orchestrates mobile experience: character picker, bottom nav, panel switching

import { characters } from '../data/characters.js';
import { state, selectCharacter, setActiveTab, setFilter, on } from '../state.js';
import { renderSidebar } from './sidebar.js';
import { getMatchCounts } from './search.js';

const MOBILE_BREAKPOINT = 900;
let isMobile = false;
let currentPanel = 'powers';
let buildSubTab = 'powers'; // track active sub-tab within Build

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
  setupMobileListeners(); // always register resize listener, even on desktop
  isMobile = checkMobile();
  if (!isMobile) return;

  document.body.classList.add('mobile-app');
  injectCharacterPicker();
  injectBottomNav();
  injectCharIndicator();

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
  // Map tab to nav item (all Build sub-tabs → 'powers')
  const navMap = {
    powers: 'powers',
    tools: 'powers',
    artifacts: 'powers',
    inspirations: 'powers',
    masteries: 'powers',
    upgrades: 'upgrades'
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

// ---- Build Sub-Toggle (Powers / Tools / Artifacts / Inspire / Masteries) ----

const BUILD_TABS = ['powers', 'tools', 'artifacts', 'inspirations', 'masteries'];
const BUILD_TAB_LABELS = {
  powers: 'Powers', tools: 'Tools', artifacts: 'Artifacts',
  inspirations: 'Inspire', masteries: 'Masteries'
};

function injectBuildSubToggle() {
  if (!isMobile) return;
  const tab = state.activeTab;
  if (!BUILD_TABS.includes(tab)) return;

  const filterBar = document.getElementById('filter-bar');
  if (!filterBar) return;
  if (filterBar.querySelector('.mobile-build-toggle')) return;

  const toggle = document.createElement('div');
  toggle.className = 'mobile-build-toggle view-toggle';
  toggle.style.marginBottom = 'var(--sp-2)';
  toggle.innerHTML = BUILD_TABS.map(t =>
    `<button class="view-toggle-btn ${tab === t ? 'active' : ''}" data-build-sub="${t}">${BUILD_TAB_LABELS[t]}</button>`
  ).join('');
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

// ---- Mobile Search Input ----

function injectMobileSearch() {
  if (!isMobile) return;
  const filterBar = document.getElementById('filter-bar');
  if (!filterBar) return;
  if (filterBar.querySelector('.mobile-search-wrapper')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'search-wrapper mobile-search-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'search-input mobile-search-input';
  input.placeholder = 'Search...';
  input.value = state.filters.search;
  input.id = 'mobile-global-search';

  const clearBtn = document.createElement('button');
  clearBtn.className = 'search-clear' + (state.filters.search ? '' : ' hidden');
  clearBtn.type = 'button';
  clearBtn.innerHTML = '&times;';
  clearBtn.addEventListener('click', () => {
    input.value = '';
    setFilter('search', '');
    input.focus();
  });

  input.addEventListener('input', (e) => {
    setFilter('search', e.target.value);
    clearBtn.classList.toggle('hidden', !e.target.value);
  });

  wrapper.appendChild(input);
  wrapper.appendChild(clearBtn);
  filterBar.prepend(wrapper);
}

function updateMobileMatchDots() {
  if (!isMobile) return;
  const toggle = document.querySelector('.mobile-build-toggle');
  if (!toggle) return;

  // Remove existing dots
  toggle.querySelectorAll('.mobile-match-dot').forEach(d => d.remove());

  const search = state.filters.search;
  if (!search) return;

  const counts = getMatchCounts(search);
  toggle.querySelectorAll('[data-build-sub]').forEach(btn => {
    const tabId = btn.dataset.buildSub;
    if (tabId !== state.activeTab && (counts[tabId] || 0) > 0) {
      const dot = document.createElement('span');
      dot.className = 'mobile-match-dot';
      btn.appendChild(dot);
    }
  });
}

// ---- HQ Filter Bar ----
// No patching needed — upgrades-tab.js renders the correct pills
// (Dragon / Dreamer / Artifacts→ / Inspirations→ / Settings).
// Redirect clicks call setActiveTab() which triggers tab-changed,
// and the mobile listener maps those tabs to the Build nav.

// ---- Event Listeners ----

let listenersRegistered = false;

function setupMobileListeners() {
  if (listenersRegistered) return;
  listenersRegistered = true;

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
    // All Build sub-tabs map to 'powers' nav item
    const navMap = {
      powers: 'powers',
      tools: 'powers',
      artifacts: 'powers',
      inspirations: 'powers',
      masteries: 'powers',
      upgrades: 'upgrades'
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
    if (BUILD_TABS.includes(tab)) {
      buildSubTab = tab;
    }

    // Inject sub-toggles and search after tab module finishes rendering
    setTimeout(() => {
      injectBuildSubToggle();
      injectMobileSearch();
      updateMobileMatchDots();
    }, 0);
  });

  on('filter-changed', () => {
    if (!isMobile) return;
    // Sync mobile search input value and clear button
    const mobileInput = document.getElementById('mobile-global-search');
    if (mobileInput && mobileInput.value !== state.filters.search) {
      mobileInput.value = state.filters.search;
    }
    const clearBtn = document.querySelector('.mobile-search-wrapper .search-clear');
    if (clearBtn) clearBtn.classList.toggle('hidden', !state.filters.search);
    updateMobileMatchDots();
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
