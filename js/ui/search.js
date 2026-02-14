// TMNT: Splintered Fate - Global Search
// Cross-tab match counting and per-tab match helpers

import { powers } from '../data/powers.js';
import { tools } from '../data/tools.js';
import { artifacts } from '../data/artifacts.js';
import { inspirations } from '../data/inspirations.js';
import { masteries } from '../data/masteries.js';
import { upgrades } from '../data/upgrades.js';

export function matchesTool(tool, searchLower) {
  return tool.name.toLowerCase().includes(searchLower) ||
         tool.effect.toLowerCase().includes(searchLower);
}

export function matchesArtifact(artifact, searchLower) {
  if (artifact.name.toLowerCase().includes(searchLower)) return true;
  if (artifact.tags.some(t => t.toLowerCase().includes(searchLower))) return true;
  if (artifact.levels.some(l => l.effect.toLowerCase().includes(searchLower))) return true;
  return false;
}

export function matchesInspiration(insp, searchLower) {
  if (insp.name.toLowerCase().includes(searchLower)) return true;
  if (insp.levels.some(l => l.effect.toLowerCase().includes(searchLower))) return true;
  return false;
}

export function matchesMastery(mastery, searchLower) {
  if (mastery.effect.toLowerCase().includes(searchLower)) return true;
  if (mastery.tags.some(t => t.toLowerCase().includes(searchLower))) return true;
  return false;
}

export function matchesUpgrade(upgrade, searchLower) {
  return upgrade.displayName.toLowerCase().includes(searchLower) ||
         upgrade.description.toLowerCase().includes(searchLower);
}

export function getMatchCounts(searchTerm) {
  if (!searchTerm) return { powers: 0, tools: 0, artifacts: 0, inspirations: 0, masteries: 0, upgrades: 0 };

  const s = searchTerm.toLowerCase();

  return {
    powers: powers.filter(p =>
      p.name.toLowerCase().includes(s) || p.effect.toLowerCase().includes(s)
    ).length,
    tools: tools.filter(t => matchesTool(t, s)).length,
    artifacts: artifacts.filter(a => matchesArtifact(a, s)).length,
    inspirations: inspirations.filter(i => matchesInspiration(i, s)).length,
    masteries: masteries.filter(m => matchesMastery(m, s)).length,
    upgrades: upgrades.filter(u => matchesUpgrade(u, s)).length
  };
}
