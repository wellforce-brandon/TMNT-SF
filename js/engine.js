// TMNT: Splintered Fate - Synergy Engine
// Prerequisite checks, element combos, mechanical synergies, stat computation

import { powers } from './data/powers.js';
import { synergyRules } from './data/synergy-rules.js';
import { upgrades } from './data/upgrades.js';
import { inspirations } from './data/inspirations.js';
import { masteries } from './data/masteries.js';
import { tools } from './data/tools.js';
import { artifacts } from './data/artifacts.js';

// ---- Lookup Maps (built once) ----
let powersByName = null;
let powersByType = null;

function ensureLookups() {
  if (powersByName) return;
  powersByName = new Map();
  powersByType = new Map();
  for (const p of powers) {
    powersByName.set(p.name, p);
    if (!powersByType.has(p.type)) powersByType.set(p.type, []);
    powersByType.get(p.type).push(p);
  }
}

// ---- Category → Element Type Map ----
// Shared by isPartMet (forward check) and partMatchesPower (reverse check)
const CATEGORY_TYPE_MAP = {
  'dealing water damage': 'water',
  'dealing flame damage': 'flame',
  'dealing utrom damage': 'utrom',
  'applying ooze': 'ooze',
  'charge': 'robotics',
  'darkness': 'dark',
  'light': 'light'
};

// Friendly display labels for category-based requires strings
export const CATEGORY_REQUIRES_LABELS = {
  'After Dealing Water Damage': 'Obtain a Water Attack Power',
  'After Dealing Flame Damage': 'Obtain a Flame Attack Power',
  'After Dealing Utrom Damage': 'Obtain a Utrom Attack Power',
  'After Applying Ooze': 'Obtain an Ooze Power',
  'After Light': 'Obtain a Light Power',
  'After Darkness': 'Obtain a Dark Power',
  'After Charge': 'Obtain a Robotics Power'
};

// ---- Prerequisite Checking ----

// Parse a requires string to determine if it's met by the current build
function isPrerequisiteMet(requiresStr, buildPowerNames, buildPowerSet) {
  if (!requiresStr) return true;

  ensureLookups();
  const req = requiresStr.toLowerCase();

  // "After X + Y" pattern (dual prerequisite)
  if (req.includes(' + ')) {
    const parts = requiresStr.split(' + ').map(s => s.trim().replace(/^after /i, ''));
    return parts.every(part => isPartMet(part, buildPowerNames, buildPowerSet));
  }

  // Single prerequisite
  const cleaned = requiresStr.replace(/^after /i, '');
  return isPartMet(cleaned, buildPowerNames, buildPowerSet);
}

function isPartMet(part, buildPowerNames, buildPowerSet) {
  ensureLookups();

  // Direct power name match
  if (buildPowerSet.has(part)) return true;

  // Handle OR patterns: "Quick Feet/First Strike"
  if (part.includes('/')) {
    const alternatives = part.split('/').map(s => s.trim());
    return alternatives.some(alt => buildPowerSet.has(alt));
  }

  // Category matches via shared map
  const partLower = part.toLowerCase();
  const categoryType = CATEGORY_TYPE_MAP[partLower];
  if (categoryType) {
    return buildPowerNames.some(n => {
      const p = powersByName.get(n);
      return p && p.type === categoryType;
    });
  }

  // Specific power name matches (case-insensitive fallbacks)
  if (partLower === 'frost') {
    return buildPowerSet.has('Frost');
  }
  if (partLower === 'inferno') {
    return buildPowerSet.has('Inferno');
  }
  if (partLower === 'electrifying') {
    return buildPowerSet.has('Electrifying');
  }

  // Generic category matches for legendary prerequisites
  if (partLower.includes('water damage power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'water');
  }
  if (partLower.includes('flame damage power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'flame');
  }
  if (partLower.includes('utrom damage power') || partLower.includes('utrom power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'utrom');
  }
  if (partLower.includes('darkness power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'dark');
  }
  if (partLower.includes('ooze applicator')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'ooze');
  }
  if (partLower.includes('any ninja power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'ninja');
  }
  if (partLower.includes('charge power') || partLower.includes('robotics power')) {
    return buildPowerNames.some(n => powersByName.get(n)?.type === 'robotics');
  }

  return false;
}

export function checkPrerequisites(buildPowerNames) {
  ensureLookups();
  const buildPowerSet = new Set(buildPowerNames);
  const available = [];
  const locked = [];

  for (const power of powers) {
    if (power.tier !== 'secondary') continue;
    if (buildPowerSet.has(power.name)) continue;

    // For legendaries, check requiredPowers
    if (power.type === 'legendary' && power.requiredPowers) {
      const met = power.requiredPowers.every(req =>
        isPartMet(req, buildPowerNames, buildPowerSet)
      );
      if (met) {
        available.push(power);
      } else {
        locked.push(power);
      }
      continue;
    }

    // For regular secondaries, check requires
    if (isPrerequisiteMet(power.requires, buildPowerNames, buildPowerSet)) {
      available.push(power);
    } else {
      locked.push(power);
    }
  }

  return { available, locked };
}

// ---- Reverse Dependency Check ----

// Find all powers in the current build that depend on the given power.
// Used to prevent deselecting a prerequisite while dependents are selected.
export function getDependentsInBuild(powerName, buildPowerNames) {
  ensureLookups();
  const buildSet = new Set(buildPowerNames);
  const power = powersByName.get(powerName);
  if (!power) return [];

  const dependents = [];

  for (const p of powers) {
    if (!buildSet.has(p.name)) continue; // only check powers in the build
    if (!p.requires) continue;

    // Check if this power's requires references our powerName
    const cleaned = p.requires.replace(/^After /i, '');

    // Handle "X + Y" dual prerequisites
    if (cleaned.includes(' + ')) {
      const parts = cleaned.split(' + ').map(s => s.trim());
      // Check if any part directly matches or matches via OR pattern
      for (const part of parts) {
        if (partMatchesPower(part, powerName, power, buildPowerNames)) {
          dependents.push(p.name);
          break;
        }
      }
    } else {
      if (partMatchesPower(cleaned, powerName, power, buildPowerNames)) {
        dependents.push(p.name);
      }
    }
  }

  return dependents;
}

// Check if a prerequisite part matches the given power (by name or category).
// For category deps, only initial-tier powers can provide category prerequisites.
function partMatchesPower(part, powerName, power, buildPowerNames) {
  // Direct name match
  if (part === powerName) return true;

  // OR pattern: "Quick Feet/First Strike"
  if (part.includes('/')) {
    const alts = part.split('/').map(s => s.trim());
    if (alts.includes(powerName)) return true;
  }

  // Category matches: only T1 (initial) powers provide category prereqs.
  // Block removal if no other initial power of that type remains.
  const partLower = part.toLowerCase();
  const categoryType = CATEGORY_TYPE_MAP[partLower];
  if (categoryType && power.type === categoryType && power.tier === 'initial') {
    const hasOtherInitial = buildPowerNames.some(n => {
      if (n === powerName) return false;
      const p = powersByName.get(n);
      return p && p.type === categoryType && p.tier === 'initial';
    });
    return !hasOtherInitial;
  }

  return false;
}

// ---- Element Combo Tracking ----

export function checkElementCombos(buildPowerNames) {
  ensureLookups();
  const elementCounts = new Map();

  for (const name of buildPowerNames) {
    const power = powersByName.get(name);
    if (power && power.type !== 'legendary') {
      elementCounts.set(power.type, (elementCounts.get(power.type) || 0) + 1);
    }
  }

  const legendaries = powersByType.get('legendary') || [];
  const nearComplete = [];
  const complete = [];

  for (const leg of legendaries) {
    if (!leg.combo) continue;
    const [el1, el2] = leg.combo;
    const has1 = elementCounts.has(el1);
    const has2 = elementCounts.has(el2);

    if (has1 && has2) {
      complete.push({ legendary: leg, elements: [el1, el2] });
    } else if (has1 || has2) {
      const missing = has1 ? el2 : el1;
      nearComplete.push({ legendary: leg, has: has1 ? el1 : el2, missing });
    }
  }

  return { elementCounts, nearComplete, complete };
}

// ---- Mechanical Synergies ----

export function checkMechanicalSynergies(build) {
  const activeSynergies = [];

  for (const rule of synergyRules) {
    if (rule.check(build)) {
      activeSynergies.push({
        id: rule.id,
        name: rule.name,
        description: rule.description,
        category: rule.category
      });
    }
  }

  return activeSynergies;
}

// ---- Build Focus ----

export function calcBuildFocus(buildPowerNames) {
  ensureLookups();
  const types = new Set();

  for (const name of buildPowerNames) {
    const power = powersByName.get(name);
    if (power && power.type !== 'legendary') {
      types.add(power.type);
    }
  }

  const count = types.size;
  let level, label;

  if (count <= 2) {
    level = 'focused';
    label = 'Focused';
  } else if (count <= 4) {
    level = 'balanced';
    label = 'Balanced';
  } else {
    level = 'scattered';
    label = 'Scattered';
  }

  return { level, label, typeCount: count, types: [...types] };
}

// ---- Computed Stats with Upgrades + Build Bonuses ----

// Resolve the value from a statBonus entry for a given level
function resolveStatValue(bonus, level) {
  if (bonus.values) {
    const idx = Math.min((level || 1) - 1, bonus.values.length - 1);
    return bonus.values[Math.max(0, idx)];
  }
  return bonus.value || 0;
}

// Collect statBonuses from a card's statBonuses array
function collectBonuses(statBonuses, level, source, permanentAcc, conditionalAcc) {
  if (!statBonuses) return;
  for (const b of statBonuses) {
    const val = resolveStatValue(b, level);
    if (b.conditional) {
      conditionalAcc.push({ stat: b.stat, value: val, source, condition: b.condition || '' });
    } else {
      permanentAcc[b.stat] = (permanentAcc[b.stat] || 0) + val;
    }
  }
}

export function computeCharacterStats(baseChar, upgradeState, buildState) {
  if (!baseChar) return null;
  ensureLookups();

  // --- HQ upgrade bonuses (existing logic) ---
  const getBonus = (statKey) => {
    let bonus = 0;
    for (const upg of upgrades) {
      if (upg.stat === statKey && upgradeState[upg.name]) {
        bonus += upg.perLevel * upgradeState[upg.name];
      }
    }
    return bonus;
  };

  const applyFlat = (base, statKey) => {
    let flat = 0;
    for (const upg of upgrades) {
      if (upg.stat === statKey && upgradeState[upg.name]) {
        flat += upgradeState[upg.name];
      }
    }
    return base + flat;
  };

  // --- Build card bonuses ---
  const perm = {};    // { statKey: totalValue }
  const cond = [];    // [{ stat, value, source, condition }]

  if (buildState) {
    // Powers
    if (buildState.powers) {
      for (const name of buildState.powers) {
        const power = powersByName ? powersByName.get(name) : powers.find(p => p.name === name);
        if (power) {
          const level = (buildState.powerLevels && buildState.powerLevels[name]) || 1;
          collectBonuses(power.statBonuses, level, name, perm, cond);
        }
      }
    }

    // Masteries
    if (buildState.masteries) {
      for (const name of buildState.masteries) {
        const mastery = masteries.find(m => m.name === name);
        if (mastery) {
          collectBonuses(mastery.statBonuses, 1, name, perm, cond);
        }
      }
    }

    // Inspirations
    if (buildState.inspirations) {
      for (const [name, level] of Object.entries(buildState.inspirations)) {
        if (level <= 0) continue;
        const insp = inspirations.find(i => i.name === name);
        if (insp) {
          collectBonuses(insp.statBonuses, level, name, perm, cond);
        }
      }
    }

    // Tool
    if (buildState.tool) {
      const tool = tools.find(t => t.name === buildState.tool);
      if (tool) {
        const level = buildState.toolLevel || 1;
        collectBonuses(tool.statBonuses, level, buildState.tool, perm, cond);
      }
    }

    // Artifact
    if (buildState.artifact) {
      const artifact = artifacts.find(a => a.name === buildState.artifact);
      if (artifact) {
        const level = buildState.artifactLevel || 1;
        collectBonuses(artifact.statBonuses, level, buildState.artifact, perm, cond);
      }
    }
  }

  // Helper: get total bonus for a stat (HQ upgrades + build permanent bonuses)
  const totalBonus = (statKey) => getBonus(statKey) + (perm[statKey] || 0);

  const applyPercent = (base, statKey) => {
    const bonus = totalBonus(statKey);
    return Math.round(base * (1 + bonus / 100));
  };

  // Flat bonuses from build (e.g., Revival's +30/60 Max Health)
  const flatBonus = (statKey) => perm[statKey] || 0;

  const baseHealth = Math.min(
    Math.round(baseChar.health * (1 + getBonus('maxHealth') / 100 + (perm['maxHealth'] || 0) / 100)) + flatBonus('maxHealthFlat'),
    baseChar.maxHealth
  );

  return {
    // Attack group
    health: baseHealth,
    attackDamage: applyPercent(baseChar.attackDamage, 'attackDamage'),
    critChance: totalBonus('critChance'),
    critDamage: totalBonus('critDamage'),
    multiHitChance: totalBonus('multiHitChance'),
    multiHitDamage: totalBonus('multiHitDamage'),
    // Dash group
    dashAttack: applyPercent(baseChar.dashAttack, 'dashAttackDamage'),
    dashAttackDamage: totalBonus('dashAttackDamage'),
    dashCharges: applyFlat(1, 'dashCharges') + (perm['dashCharges'] || 0),
    // Special group
    specialAttack: applyPercent(baseChar.specialAttack, 'specialAttack'),
    specialChargeRate: totalBonus('specialChargeRate'),
    specialCritChance: totalBonus('specialCritChance'),
    // Tool group
    toolDamage: totalBonus('toolDamage'),
    toolChargeRate: totalBonus('toolChargeRate'),
    // Elemental group
    elementalDamage: totalBonus('elementalDamage'),
    negativeEffectDuration: totalBonus('negativeEffectDuration'),
    negativeEffectDamage: totalBonus('negativeEffectDamage'),
    // Defense / Utility
    dodgeChance: totalBonus('dodgeChance'),
    moveSpeed: totalBonus('moveSpeed'),
    healEffectiveness: totalBonus('healEffectiveness'),
    revives: applyFlat(0, 'revives') + (perm['revives'] || 0),
    // Conditional bonuses (for separate display)
    conditionalBonuses: cond
  };
}

// ---- Full Analysis ----

export function runFullAnalysis(state, upgradeState) {
  const prerequisites = checkPrerequisites(state.powers);
  const combos = checkElementCombos(state.powers);
  const synergies = checkMechanicalSynergies({
    powers: state.powers,
    tool: state.tool,
    artifact: state.artifact,
    masteries: state.masteries
  });
  const focus = calcBuildFocus(state.powers);

  return {
    prerequisites,
    combos,
    synergies,
    focus,
    powerCount: state.powers.length,
    elementCounts: combos.elementCounts
  };
}
