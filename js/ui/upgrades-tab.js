// TMNT: Splintered Fate - Upgrades Tab
// Unified panel for Dragon/Dreamer upgrades, artifact upgrades, inspiration upgrades

import { upgrades } from '../data/upgrades.js';
import { artifacts } from '../data/artifacts.js';
import { inspirations } from '../data/inspirations.js';
import { characters } from '../data/characters.js';
import {
  state, settings, upgradeState, artifactUpgrades, inspirationUpgrades,
  setUpgradeLevel, maxAllUpgrades, resetAllUpgrades,
  setArtifactUpgradeLevel, setInspirationUpgradeLevel,
  getArtifactUpgradeLevel, getInspirationUpgradeLevel,
  setAutoTheme, on
} from '../state.js';

let activeSection = 'dragon';
let _suppressRender = false;

const SECTIONS = [
  { id: 'dragon', label: 'Dragon' },
  { id: 'dreamer', label: 'Dreamer' },
  { id: 'artifacts', label: 'Artifacts' },
  { id: 'inspirations', label: 'Inspirations' },
  { id: 'settings', label: 'Settings' }
];

const charNameMap = new Map();
for (const c of characters) {
  charNameMap.set(c.id, c.name);
}

export function initUpgradesTab() {
  on('tab-changed', (tab) => {
    if (tab === 'upgrades') render();
  });
  on('upgrades-changed', () => {
    if (state.activeTab === 'upgrades' && !_suppressRender) render();
  });
  on('artifact-upgrades-changed', () => {
    if (state.activeTab === 'upgrades') render();
  });
  on('inspiration-upgrades-changed', () => {
    if (state.activeTab === 'upgrades') render();
  });
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
    case 'artifacts':
      renderArtifactUpgrades(container);
      break;
    case 'inspirations':
      renderInspirationUpgrades(container);
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

function renderArtifactUpgrades(container) {
  let html = '';

  // Group by category
  const categories = [...new Set(artifacts.map(a => a.category))];

  for (const cat of categories) {
    const catArtifacts = artifacts.filter(a => a.category === cat);
    html += `<div class="inspiration-group-header" style="grid-column: 1 / -1">
      <span class="filter-group-label">${cat}</span>
    </div>`;

    for (const artifact of catArtifacts) {
      const level = getArtifactUpgradeLevel(artifact.name);
      const maxLevel = artifact.levels.length;
      const levelData = artifact.levels.find(l => l.level === level) || artifact.levels[0];

      html += `
        <div class="card upgrade-card">
          <div class="card-edge-zone card-edge-dec" data-art-upg-dec="${artifact.name}">&minus;</div>
          <div class="card-edge-zone card-edge-inc" data-art-upg-inc="${artifact.name}" data-max="${maxLevel}">+</div>
          <div class="card-header">
            <span class="card-name">${artifact.name}</span>
            <span class="badge badge-slot">Lv${level}/${maxLevel}</span>
          </div>
          <div class="card-effect">${levelData.effect}</div>
          <div class="card-meta">
            <div class="level-selector">
              ${artifact.levels.map(l =>
                `<button class="level-btn ${level === l.level ? 'active' : ''}" data-art-upg="${artifact.name}" data-level="${l.level}">${l.level}</button>`
              ).join('')}
            </div>
          </div>
          <div style="margin-top: var(--sp-2)">
            ${artifact.levels.map(l =>
              `<div class="card-prereq ${level >= l.level ? 'card-prereq-met' : ''}">Lv${l.level}: ${l.effect}</div>`
            ).join('')}
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = html;

  // Bind level buttons
  container.querySelectorAll('.level-btn[data-art-upg]').forEach(btn => {
    btn.addEventListener('click', () => {
      setArtifactUpgradeLevel(btn.dataset.artUpg, parseInt(btn.dataset.level));
    });
  });

  // Bind edge zone +/- for artifact upgrades
  container.querySelectorAll('.card-edge-zone[data-art-upg-dec]').forEach(zone => {
    zone.addEventListener('click', () => {
      const name = zone.dataset.artUpgDec;
      const current = getArtifactUpgradeLevel(name);
      if (current > 0) setArtifactUpgradeLevel(name, current - 1);
    });
  });
  container.querySelectorAll('.card-edge-zone[data-art-upg-inc]').forEach(zone => {
    zone.addEventListener('click', () => {
      const name = zone.dataset.artUpgInc;
      const max = parseInt(zone.dataset.max);
      const current = getArtifactUpgradeLevel(name);
      if (current < max) setArtifactUpgradeLevel(name, current + 1);
    });
  });
}

function renderInspirationUpgrades(container) {
  const CHAR_ORDER = ['michelangelo', 'leonardo', 'raphael', 'donatello', 'casey', 'metalhead'];

  let html = '';

  for (const charId of CHAR_ORDER) {
    const charInsps = inspirations.filter(i => i.character === charId);
    if (charInsps.length === 0) continue;

    const charName = charNameMap.get(charId) || charId;
    html += `<div class="inspiration-group-header" style="grid-column: 1 / -1">
      <span class="filter-group-label">${charName}</span>
    </div>`;

    for (const insp of charInsps) {
      const level = getInspirationUpgradeLevel(insp.name);
      const maxLevel = insp.levels.length;
      const levelData = insp.levels.find(l => l.level === level) || insp.levels[0];

      html += `
        <div class="card upgrade-card">
          <div class="card-edge-zone card-edge-dec" data-insp-upg-dec="${insp.name}">&minus;</div>
          <div class="card-edge-zone card-edge-inc" data-insp-upg-inc="${insp.name}" data-max="${maxLevel}">+</div>
          <div class="card-header">
            <span class="card-name">${insp.name}</span>
            <span class="badge badge-slot">Lv${level}/${maxLevel}</span>
          </div>
          <div class="card-effect">${levelData.effect}</div>
          <div class="card-meta">
            <div class="level-selector">
              ${insp.levels.map(l =>
                `<button class="level-btn ${level === l.level ? 'active' : ''}" data-insp-upg="${insp.name}" data-level="${l.level}">${l.level}</button>`
              ).join('')}
            </div>
          </div>
          <div style="margin-top: var(--sp-2)">
            ${insp.levels.map(l =>
              `<div class="card-prereq ${level >= l.level ? 'card-prereq-met' : ''}">Lv${l.level}: ${l.effect}</div>`
            ).join('')}
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = html;

  // Bind level buttons
  container.querySelectorAll('.level-btn[data-insp-upg]').forEach(btn => {
    btn.addEventListener('click', () => {
      setInspirationUpgradeLevel(btn.dataset.inspUpg, parseInt(btn.dataset.level));
    });
  });

  // Bind edge zone +/- for inspiration upgrades
  container.querySelectorAll('.card-edge-zone[data-insp-upg-dec]').forEach(zone => {
    zone.addEventListener('click', () => {
      const name = zone.dataset.inspUpgDec;
      const current = getInspirationUpgradeLevel(name);
      if (current > 0) setInspirationUpgradeLevel(name, current - 1);
    });
  });
  container.querySelectorAll('.card-edge-zone[data-insp-upg-inc]').forEach(zone => {
    zone.addEventListener('click', () => {
      const name = zone.dataset.inspUpgInc;
      const max = parseInt(zone.dataset.max);
      const current = getInspirationUpgradeLevel(name);
      if (current < max) setInspirationUpgradeLevel(name, current + 1);
    });
  });
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
