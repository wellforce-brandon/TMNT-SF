// TMNT: Splintered Fate - Run Builder
// Entry point: imports, init, event wiring

import { loadPersistedState, state, on } from './state.js';
import { initTopbar, applyTheme } from './ui/topbar.js';
import { initTabs } from './ui/tabs.js';
import { initPowersTab, render as renderPowers } from './ui/powers-tab.js';
import { initToolsTab } from './ui/tools-tab.js';
import { initArtifactsTab } from './ui/artifacts-tab.js';
import { initMasteriesTab } from './ui/masteries-tab.js';
import { initInspirationsTab } from './ui/inspirations-tab.js';
import { initSidebar } from './ui/sidebar.js';
import { initUpgradesTab } from './ui/upgrades-tab.js';

function init() {
  // Load persisted state from localStorage
  loadPersistedState();

  // Initialize all UI modules
  initTopbar();
  initTabs();
  initPowersTab();
  initToolsTab();
  initArtifactsTab();
  initMasteriesTab();
  initInspirationsTab();
  initSidebar();
  initUpgradesTab();

  // Apply initial theme
  applyTheme();

  // Render the initial active tab
  renderActiveTab();

  // Re-render tab content when tab changes
  on('tab-changed', renderActiveTab);
}

function renderActiveTab() {
  // Each tab's init function already listens for tab-changed,
  // but we trigger the initial render for the default tab
  switch (state.activeTab) {
    case 'powers':
      renderPowers();
      break;
    // Other tabs render via their own tab-changed listeners
  }
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
