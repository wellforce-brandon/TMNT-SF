// TMNT: Splintered Fate - HQ Upgrades Tab
// Dragon/Dreamer upgrades, settings (artifacts & inspirations redirect to their own tabs)

import { upgrades } from '../data/upgrades.js';
import {
  state, settings, upgradeState,
  setUpgradeLevel, maxAllUpgrades, resetAllUpgrades,
  setActiveTab, setAutoTheme, on
} from '../state.js';

let activeSection = 'dragon';
let _suppressRender = false;

const SECTIONS = [
  { id: 'dragon', label: 'Dragon' },
  { id: 'dreamer', label: 'Dreamer' },
  { id: 'artifacts', label: 'Artifacts →', redirect: 'artifacts' },
  { id: 'inspirations', label: 'Inspirations →', redirect: 'inspirations' },
  { id: 'settings', label: 'Settings' }
];

export function initUpgradesTab() {
  on('tab-changed', (tab) => {
    if (tab === 'upgrades') render();
  });
  on('upgrades-changed', () => {
    if (state.activeTab === 'upgrades' && !_suppressRender) render();
  });
}

export function setSection(sectionId) {
  activeSection = sectionId;
}

export function render() {
  renderFilters();
  renderGrid();
}

function renderFilters() {
  const container = document.getElementById('filter-bar');
  if (!container) return;

  container.innerHTML = `
    <div class="filter-group">
      ${SECTIONS.map(s =>
        `<button class="filter-pill ${activeSection === s.id ? 'active' : ''}" data-section="${s.id}">${s.label}</button>`
      ).join('')}
    </div>
  `;

  container.querySelectorAll('.filter-pill[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = SECTIONS.find(s => s.id === btn.dataset.section);
      if (section && section.redirect) {
        setActiveTab(section.redirect);
        return;
      }
      activeSection = btn.dataset.section;
      render();
    });
  });
}

function renderGrid() {
  const container = document.getElementById('card-grid');
  if (!container) return;

  switch (activeSection) {
    case 'dragon':
      renderDragonDreamer(container, 'dragon');
      break;
    case 'dreamer':
      renderDragonDreamer(container, 'dreamer');
      break;
    case 'settings':
      renderSettings(container);
      break;
  }
}

function renderDragonDreamer(container, currency) {
  const filtered = upgrades.filter(u => u.currency === currency);
  const label = currency === 'dragon' ? 'Dragon' : 'Dreamer';

  let html = `
    <div style="grid-column: 1 / -1; display: flex; gap: var(--sp-2); margin-bottom: var(--sp-2)">
      <button class="btn btn-small" data-action="max-all-${currency}">Max All ${label}</button>
      <button class="btn btn-small btn-ghost" data-action="reset-all-${currency}">Reset All ${label}</button>
    </div>
  `;

  for (const upg of filtered) {
    const level = upgradeState[upg.name] || 0;
    const effect = upg.perLevel ? `+${Math.round(upg.perLevel * level)}%` : '';

    html += `
      <div class="card upgrade-card">
        <div class="card-edge-zone card-edge-dec" data-upg="${upg.name}" data-action="dec">&minus;</div>
        <div class="card-edge-zone card-edge-inc" data-upg="${upg.name}" data-action="inc">+</div>
        <div class="card-header">
          <span class="card-name">${upg.displayName}</span>
          <span class="badge badge-slot">${level}/${upg.maxLevel}</span>
        </div>
        <div class="card-effect">${upg.description}${effect ? ` (${effect})` : ''}</div>
        <div class="card-meta">
          <div class="upgrade-controls">
            <input type="range" class="upgrade-slider"
                   min="0" max="${upg.maxLevel}" value="${level}"
                   data-upgrade="${upg.name}">
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;

  // Bind sliders — update in-place to avoid destroying the element mid-drag
  container.querySelectorAll('.upgrade-slider').forEach(slider => {
    slider.addEventListener('input', () => {
      const name = slider.dataset.upgrade;
      const level = parseInt(slider.value);
      const upg = upgrades.find(u => u.name === name);

      _suppressRender = true;
      setUpgradeLevel(name, level);
      _suppressRender = false;

      // Update badge and effect text in-place
      const card = slider.closest('.upgrade-card');
      if (card && upg) {
        const badge = card.querySelector('.badge');
        if (badge) badge.textContent = `${level}/${upg.maxLevel}`;
        const effect = card.querySelector('.card-effect');
        if (effect) {
          const effectStr = upg.perLevel ? ` (+${Math.round(upg.perLevel * level)}%)` : '';
          effect.textContent = `${upg.description}${effectStr}`;
        }
      }
    });
  });

  // Bind edge tap zones for +/-
  container.querySelectorAll('.card-edge-zone[data-upg]').forEach(zone => {
    zone.addEventListener('click', () => {
      const upg = upgrades.find(u => u.name === zone.dataset.upg);
      if (!upg) return;
      const current = upgradeState[upg.name] || 0;
      if (zone.dataset.action === 'inc' && current < upg.maxLevel) {
        setUpgradeLevel(upg.name, current + 1);
      } else if (zone.dataset.action === 'dec' && current > 0) {
        setUpgradeLevel(upg.name, current - 1);
      }
    });
  });

  // Bind max/reset
  const maxBtn = container.querySelector(`[data-action="max-all-${currency}"]`);
  const resetBtn = container.querySelector(`[data-action="reset-all-${currency}"]`);
  if (maxBtn) {
    maxBtn.addEventListener('click', () => maxAllUpgrades(filtered));
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      for (const upg of filtered) {
        setUpgradeLevel(upg.name, 0);
      }
    });
  }
}

function renderSettings(container) {
  container.innerHTML = `
    <div style="grid-column: 1 / -1">
      <div class="card">
        <div class="card-header">
          <span class="card-name">Auto-switch Theme</span>
          <label class="toggle-switch">
            <input type="checkbox" id="upgrades-auto-theme" ${settings.autoTheme ? 'checked' : ''}>
            <span class="toggle-track"></span>
          </label>
        </div>
        <div class="card-effect">Automatically change theme when selecting a character</div>
      </div>
    </div>
  `;

  const toggle = document.getElementById('upgrades-auto-theme');
  if (toggle) {
    toggle.addEventListener('change', () => {
      setAutoTheme(toggle.checked);
    });
  }
}
