// TMNT: Splintered Fate - App State Management
// Central state with mutation helpers and localStorage persistence

import { characters } from './data/characters.js';

const STORAGE_KEY_UPGRADES = 'tmnt-sf-upgrades';
const STORAGE_KEY_SETTINGS = 'tmnt-sf-settings';
const STORAGE_KEY_BUILD = 'tmnt-sf-build';
const STORAGE_KEY_ARTIFACT_UPGRADES = 'tmnt-sf-artifact-upgrades';
const STORAGE_KEY_INSPIRATION_UPGRADES = 'tmnt-sf-inspiration-upgrades';

// ---- Event System ----
const listeners = new Map();

export function on(event, fn) {
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event).add(fn);
  return () => listeners.get(event).delete(fn);
}

function emit(event, data) {
  if (listeners.has(event)) {
    for (const fn of listeners.get(event)) fn(data);
  }
}

// ---- App State ----
export const state = {
  character: null,
  artifact: null,
  artifactLevel: 1,
  tool: null,
  toolLevel: 1,        // 1-3 (temporary in-run upgrade)
  powers: [],
  powerLevels: {},     // { powerName: level (1-3) }
  masteries: [],
  inspirations: {},    // { inspirationName: level }
  activeTab: 'powers',
  filters: {
    types: new Set(),
    slot: 'all',
    tier: 'all',
    search: ''
  }
};

// ---- Settings State ----
export const settings = {
  autoTheme: true,
  themeMode: 'dark',   // 'light' | 'dark' (only used when no character or autoTheme off)
  colorStats: true     // color-code stat groups in sidebar
};

// ---- Upgrade State ----
export const upgradeState = {};

// ---- Permanent Artifact/Inspiration Upgrade State ----
// Tracks permanently unlocked levels (persist across runs)
export const artifactUpgrades = {};      // { [artifactName]: unlockedLevel }
export const inspirationUpgrades = {};   // { [inspirationName]: unlockedLevel }

// ---- Helpers ----

function getStartingInspirations(charId) {
  if (!charId) return [];
  const char = characters.find(c => c.id === charId);
  return char ? char.inspirations : [];
}

function applyStartingInspirations(charId) {
  const starters = getStartingInspirations(charId);
  for (const name of starters) {
    const minLevel = getInspirationUpgradeLevel(name);
    if (!state.inspirations[name] || state.inspirations[name] < minLevel) {
      state.inspirations[name] = minLevel;
    }
  }
}

export function isStartingInspiration(inspirationName) {
  return getStartingInspirations(state.character).includes(inspirationName);
}

// ---- State Mutations ----

export function selectCharacter(charId) {
  if (state.character === charId) {
    state.character = null;
    state.tool = null;
    state.toolLevel = 1;
  } else {
    state.character = charId;
    const char = characters.find(c => c.id === charId);
    if (char) {
      state.tool = char.defaultTool;
    }
  }
  // Reset character-specific selections
  state.masteries = [];
  state.inspirations = {};
  applyStartingInspirations(state.character);
  saveBuild();
  emit('character-changed', state.character);
  emit('build-changed', state);
}

export function addPower(powerName) {
  if (!state.powers.includes(powerName)) {
    state.powers.push(powerName);
    state.powerLevels[powerName] = 1;
    emit('build-changed', state);
    saveBuild();
  }
}

export function removePower(powerName) {
  const idx = state.powers.indexOf(powerName);
  if (idx !== -1) {
    state.powers.splice(idx, 1);
    delete state.powerLevels[powerName];
    emit('build-changed', state);
    saveBuild();
  }
}

export function togglePower(powerName) {
  if (state.powers.includes(powerName)) {
    removePower(powerName);
  } else {
    addPower(powerName);
  }
}

export function setPowerLevel(powerName, level) {
  if (level <= 0) {
    removePower(powerName);
    return;
  }
  if (level > 3) level = 3;
  if (!state.powers.includes(powerName)) {
    state.powers.push(powerName);
  }
  state.powerLevels[powerName] = level;
  emit('build-changed', state);
  saveBuild();
}

export function setTool(toolName) {
  if (state.tool === toolName) {
    // Toggle off
    state.tool = null;
    state.toolLevel = 1;
  } else {
    state.tool = toolName;
    state.toolLevel = 1;
  }
  emit('build-changed', state);
  saveBuild();
}

export function setToolLevel(level) {
  if (level <= 0) {
    state.tool = null;
    state.toolLevel = 1;
  } else {
    if (level > 3) level = 3;
    state.toolLevel = level;
  }
  emit('build-changed', state);
  saveBuild();
}

export function setArtifact(artifactName, level) {
  if (state.artifact === artifactName && level === undefined) {
    state.artifact = null;
    state.artifactLevel = 1;
  } else {
    state.artifact = artifactName;
    const minLevel = getArtifactUpgradeLevel(artifactName);
    if (level !== undefined) {
      state.artifactLevel = Math.max(level, minLevel);
    } else {
      state.artifactLevel = Math.max(state.artifactLevel, minLevel);
    }
  }
  emit('build-changed', state);
  saveBuild();
}

export function setArtifactLevel(level) {
  // Enforce permanent upgrade minimum
  if (state.artifact) {
    const minLevel = getArtifactUpgradeLevel(state.artifact);
    if (level < minLevel) level = minLevel;
  }
  state.artifactLevel = level;
  emit('build-changed', state);
  saveBuild();
}

export function toggleMastery(masteryName) {
  const idx = state.masteries.indexOf(masteryName);
  if (idx !== -1) {
    state.masteries.splice(idx, 1);
  } else {
    state.masteries.push(masteryName);
  }
  emit('build-changed', state);
  saveBuild();
}

export function setInspirationLevel(inspirationName, level) {
  // Don't allow turning off starting inspirations
  if (level === 0 && isStartingInspiration(inspirationName)) return;

  // Enforce permanent upgrade minimum
  const minLevel = isStartingInspiration(inspirationName) ? getInspirationUpgradeLevel(inspirationName) : 0;
  if (level < minLevel) level = minLevel;

  if (level === 0) {
    delete state.inspirations[inspirationName];
  } else {
    state.inspirations[inspirationName] = level;
  }
  emit('build-changed', state);
  saveBuild();
}

export function setActiveTab(tab) {
  state.activeTab = tab;
  emit('tab-changed', tab);
}

export function setFilter(key, value) {
  if (key === 'types') {
    state.filters.types = value;
  } else {
    state.filters[key] = value;
  }
  emit('filter-changed', state.filters);
}

export function toggleTypeFilter(type) {
  if (state.filters.types.has(type)) {
    state.filters.types.delete(type);
  } else {
    state.filters.types.add(type);
  }
  emit('filter-changed', state.filters);
}

export function clearBuild() {
  state.powers = [];
  state.powerLevels = {};
  state.masteries = [];
  state.inspirations = {};
  state.artifact = null;
  state.artifactLevel = 1;
  state.toolLevel = 1;
  if (state.character) {
    const char = characters.find(c => c.id === state.character);
    if (char) state.tool = char.defaultTool;
  } else {
    state.tool = null;
  }
  applyStartingInspirations(state.character);
  emit('build-changed', state);
  saveBuild();
}

// ---- Upgrade Mutations ----

export function setUpgradeLevel(upgradeName, level) {
  upgradeState[upgradeName] = level;
  emit('upgrades-changed', upgradeState);
  saveUpgrades();
}

export function maxAllUpgrades(upgradesData) {
  for (const upg of upgradesData) {
    upgradeState[upg.name] = upg.maxLevel;
  }
  emit('upgrades-changed', upgradeState);
  saveUpgrades();
}

export function resetAllUpgrades() {
  for (const key of Object.keys(upgradeState)) {
    upgradeState[key] = 0;
  }
  emit('upgrades-changed', upgradeState);
  saveUpgrades();
}

// ---- Permanent Artifact/Inspiration Upgrade Mutations ----

export function getArtifactUpgradeLevel(name) {
  return artifactUpgrades[name] || 1;
}

export function getInspirationUpgradeLevel(name) {
  return inspirationUpgrades[name] || 1;
}

export function setArtifactUpgradeLevel(name, level) {
  if (level <= 1) {
    delete artifactUpgrades[name];
  } else {
    artifactUpgrades[name] = level;
  }
  // If this artifact is currently in build, enforce minimum level
  if (state.artifact === name && state.artifactLevel < level) {
    state.artifactLevel = level;
  }
  emit('artifact-upgrades-changed', artifactUpgrades);
  emit('build-changed', state);
  saveArtifactUpgrades();
  saveBuild();
}

export function setInspirationUpgradeLevel(name, level) {
  if (level <= 1) {
    delete inspirationUpgrades[name];
  } else {
    inspirationUpgrades[name] = level;
  }
  // If this inspiration is active in build, enforce minimum level
  if (state.inspirations[name] && state.inspirations[name] < level) {
    state.inspirations[name] = level;
  }
  emit('inspiration-upgrades-changed', inspirationUpgrades);
  emit('build-changed', state);
  saveInspirationUpgrades();
  saveBuild();
}

// ---- Settings Mutations ----

export function setAutoTheme(value) {
  settings.autoTheme = value;
  emit('settings-changed', settings);
  saveSettings();
}

export function setThemeMode(mode) {
  settings.themeMode = mode;
  emit('settings-changed', settings);
  saveSettings();
}

export function setColorStats(value) {
  settings.colorStats = value;
  emit('settings-changed', settings);
  saveSettings();
}

// ---- Computed Values ----

export function getCharacter() {
  if (!state.character) return null;
  return characters.find(c => c.id === state.character) || null;
}

export function getComputedStats() {
  const char = getCharacter();
  if (!char) return null;

  const get = (stat, fallback) => {
    let bonus = 0;
    for (const [key, level] of Object.entries(upgradeState)) {
      if (level > 0) {
        // This will be enhanced when we have the upgrades data loaded
        // For now, we just track the raw levels
      }
    }
    return fallback;
  };

  return {
    health: char.health,
    maxHealth: char.maxHealth,
    attackDamage: char.attackDamage,
    dashAttack: char.dashAttack,
    specialAttack: char.specialAttack,
    specialChargeRate: char.specialChargeRate
  };
}

// ---- Persistence ----

function saveBuild() {
  try {
    const data = {
      character: state.character,
      powers: state.powers,
      powerLevels: state.powerLevels,
      tool: state.tool,
      toolLevel: state.toolLevel,
      artifact: state.artifact,
      artifactLevel: state.artifactLevel,
      masteries: state.masteries,
      inspirations: state.inspirations
    };
    localStorage.setItem(STORAGE_KEY_BUILD, JSON.stringify(data));
  } catch (e) {
    // localStorage unavailable
  }
}

function saveUpgrades() {
  try {
    localStorage.setItem(STORAGE_KEY_UPGRADES, JSON.stringify(upgradeState));
  } catch (e) {
    // localStorage unavailable
  }
}

function saveSettings() {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    // localStorage unavailable
  }
}

function saveArtifactUpgrades() {
  try {
    localStorage.setItem(STORAGE_KEY_ARTIFACT_UPGRADES, JSON.stringify(artifactUpgrades));
  } catch (e) {
    // localStorage unavailable
  }
}

function saveInspirationUpgrades() {
  try {
    localStorage.setItem(STORAGE_KEY_INSPIRATION_UPGRADES, JSON.stringify(inspirationUpgrades));
  } catch (e) {
    // localStorage unavailable
  }
}

// ---- Cloud State Merge ----
// Called by supabase.js when cloud data is loaded after login

export function applyCloudState(cloudUpgrades, cloudArtifacts, cloudInspirations) {
  // Replace upgradeState contents
  for (const key of Object.keys(upgradeState)) delete upgradeState[key];
  Object.assign(upgradeState, cloudUpgrades);

  // Replace artifactUpgrades contents
  for (const key of Object.keys(artifactUpgrades)) delete artifactUpgrades[key];
  Object.assign(artifactUpgrades, cloudArtifacts);

  // Replace inspirationUpgrades contents
  for (const key of Object.keys(inspirationUpgrades)) delete inspirationUpgrades[key];
  Object.assign(inspirationUpgrades, cloudInspirations);

  // Persist merged state to localStorage (so offline has latest)
  saveUpgrades();
  saveArtifactUpgrades();
  saveInspirationUpgrades();

  // Re-apply starting inspiration minimums
  applyStartingInspirations(state.character);

  // Notify all UI
  emit('upgrades-changed', upgradeState);
  emit('artifact-upgrades-changed', artifactUpgrades);
  emit('inspiration-upgrades-changed', inspirationUpgrades);
  emit('build-changed', state);
}

export function loadPersistedState() {
  try {
    // Load upgrades
    const upgStr = localStorage.getItem(STORAGE_KEY_UPGRADES);
    if (upgStr) {
      Object.assign(upgradeState, JSON.parse(upgStr));
    }

    // Load permanent artifact upgrades
    const artUpgStr = localStorage.getItem(STORAGE_KEY_ARTIFACT_UPGRADES);
    if (artUpgStr) {
      Object.assign(artifactUpgrades, JSON.parse(artUpgStr));
    }

    // Load permanent inspiration upgrades
    const inspUpgStr = localStorage.getItem(STORAGE_KEY_INSPIRATION_UPGRADES);
    if (inspUpgStr) {
      Object.assign(inspirationUpgrades, JSON.parse(inspUpgStr));
    }

    // Load settings
    const setStr = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (setStr) {
      Object.assign(settings, JSON.parse(setStr));
    }

    // Load build
    const buildStr = localStorage.getItem(STORAGE_KEY_BUILD);
    if (buildStr) {
      const data = JSON.parse(buildStr);
      if (data.character) state.character = data.character;
      if (data.powers) state.powers = data.powers;
      if (data.powerLevels) state.powerLevels = data.powerLevels;
      if (data.tool) state.tool = data.tool;
      if (data.toolLevel) state.toolLevel = data.toolLevel;
      if (data.artifact) state.artifact = data.artifact;
      if (data.artifactLevel) state.artifactLevel = data.artifactLevel;
      if (data.masteries) state.masteries = data.masteries;
      if (data.inspirations) state.inspirations = data.inspirations;
    }
    // Ensure starting inspirations are always present (respects permanent levels)
    applyStartingInspirations(state.character);
  } catch (e) {
    // localStorage unavailable or corrupt data
  }
}
