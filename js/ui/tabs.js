// TMNT: Splintered Fate - Tab Bar
// Tab rendering and switching

import { state, setActiveTab, on } from '../state.js';

const TABS = [
  { id: 'powers', label: 'Powers' },
  { id: 'tools', label: 'Tools' },
  { id: 'artifacts', label: 'Artifacts' },
  { id: 'masteries', label: 'Masteries' },
  { id: 'inspirations', label: 'Inspirations' }
];

export function initTabs() {
  renderTabs();
  on('tab-changed', renderTabs);
}

function renderTabs() {
  const container = document.getElementById('tab-bar');
  if (!container) return;

  container.innerHTML = TABS.map(tab => `
    <button class="tab-btn ${state.activeTab === tab.id ? 'active' : ''}"
            data-tab="${tab.id}">
      ${tab.label}
    </button>
  `).join('');

  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveTab(btn.dataset.tab);
    });
  });
}
