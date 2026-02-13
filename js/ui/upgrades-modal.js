// TMNT: Splintered Fate - Upgrades Modal
// Slider/stepper for each upgrade, max/reset all, auto-save to localStorage

import { upgrades } from '../data/upgrades.js';
import { upgradeState, settings, setUpgradeLevel, maxAllUpgrades, resetAllUpgrades, setAutoTheme, on } from '../state.js';

export function initUpgradesModal() {
  renderUpgrades();
  renderSettings();

  on('upgrades-changed', renderUpgrades);

  // Max All button
  const maxBtn = document.getElementById('max-all-upgrades');
  if (maxBtn) {
    maxBtn.addEventListener('click', () => maxAllUpgrades(upgrades));
  }

  // Reset All button
  const resetBtn = document.getElementById('reset-all-upgrades');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllUpgrades);
  }
}

function renderSettings() {
  const container = document.getElementById('settings-auto-theme');
  if (!container) return;

  container.innerHTML = `
    <div>
      <div class="settings-label">Auto-switch theme</div>
      <div class="settings-description">Automatically change theme when selecting a character</div>
    </div>
    <label class="toggle-switch">
      <input type="checkbox" id="auto-theme-toggle" ${settings.autoTheme ? 'checked' : ''}>
      <span class="toggle-track"></span>
    </label>
  `;

  const toggle = document.getElementById('auto-theme-toggle');
  if (toggle) {
    toggle.addEventListener('change', () => {
      setAutoTheme(toggle.checked);
    });
  }
}

function renderUpgrades() {
  renderColumn('dragon-upgrades', 'dragon');
  renderColumn('dreamer-upgrades', 'dreamer');
}

function renderColumn(containerId, currency) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const currencyUpgrades = upgrades.filter(u => u.currency === currency);

  // Keep the title, replace the rest
  const title = container.querySelector('.upgrade-column-title');
  const titleHtml = title ? title.outerHTML : `<h3 class="upgrade-column-title">${currency === 'dragon' ? 'Dragon' : 'Dreamer'} Upgrades</h3>`;

  let html = titleHtml;

  for (const upg of currencyUpgrades) {
    const level = upgradeState[upg.name] || 0;
    const currentEffect = upg.perLevel ? `+${Math.round(upg.perLevel * level)}%` : `${level}/${upg.maxLevel}`;

    html += `
      <div class="upgrade-row">
        <span class="upgrade-name" title="${upg.description || ''}">${upg.displayName}</span>
        <input type="range" class="upgrade-slider"
               min="0" max="${upg.maxLevel}" value="${level}"
               data-upgrade="${upg.name}">
        <span class="upgrade-level">${level}/${upg.maxLevel}</span>
        <span class="upgrade-effect">${currentEffect}</span>
      </div>
    `;
  }

  container.innerHTML = html;

  // Bind sliders
  container.querySelectorAll('.upgrade-slider').forEach(slider => {
    slider.addEventListener('input', () => {
      setUpgradeLevel(slider.dataset.upgrade, parseInt(slider.value));
    });
  });
}
