// TMNT: Splintered Fate - Tab Bar
// Tab rendering, switching, global search input, cross-tab match badges

import { state, setActiveTab, setFilter, on } from '../state.js';
import { getMatchCounts } from './search.js';

const TABS = [
  { id: 'powers', label: 'Powers' },
  { id: 'tools', label: 'Tools' },
  { id: 'artifacts', label: 'Artifacts' },
  { id: 'masteries', label: 'Masteries' },
  { id: 'inspirations', label: 'Inspirations' },
  { id: 'upgrades', label: 'HQ Upgrades' }
];

export function initTabs() {
  renderTabs();
  on('tab-changed', renderTabs);
  on('filter-changed', updateMatchBadges);
}

function renderTabs() {
  const container = document.getElementById('tab-bar');
  if (!container) return;

  // Ensure wrapper for tab buttons exists
  let tabsWrapper = container.querySelector('.tab-buttons');
  if (!tabsWrapper) {
    tabsWrapper = document.createElement('div');
    tabsWrapper.className = 'tab-buttons';
    container.appendChild(tabsWrapper);
  }

  tabsWrapper.innerHTML = TABS.map(tab => `
    <button class="tab-btn ${state.activeTab === tab.id ? 'active' : ''}"
            data-tab="${tab.id}">
      ${tab.label}<span class="tab-match-badge hidden" data-tab-badge="${tab.id}"></span>
    </button>
  `).join('');

  tabsWrapper.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveTab(btn.dataset.tab);
    });
  });

  // Create search input once — persists across tab switches
  if (!container.querySelector('.tab-search-input')) {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input tab-search-input';
    searchInput.placeholder = 'Search...';
    searchInput.id = 'global-search';
    searchInput.value = state.filters.search;
    container.appendChild(searchInput);

    searchInput.addEventListener('input', (e) => {
      setFilter('search', e.target.value);
    });
  }

  updateMatchBadges();
}

function updateMatchBadges() {
  const container = document.getElementById('tab-bar');
  if (!container) return;

  const badges = container.querySelectorAll('[data-tab-badge]');
  const search = state.filters.search;

  if (!search) {
    badges.forEach(b => b.classList.add('hidden'));
    return;
  }

  const counts = getMatchCounts(search);

  badges.forEach(badge => {
    const tabId = badge.dataset.tabBadge;
    const count = counts[tabId] || 0;
    if (tabId !== state.activeTab && count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}
