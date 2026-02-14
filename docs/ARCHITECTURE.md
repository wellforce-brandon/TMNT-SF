# Architecture

> Back to [README](../README.md)

---

## Overview

The app is a single-page application built with vanilla JavaScript (ES6 modules), loaded directly in the browser with no build step, bundler, or transpiler. It follows an offline-first strategy — all state persists in localStorage, with optional cloud sync via Supabase when the user logs in with Discord.

**Key principles:**
- No framework — pure DOM manipulation
- No build tools — native `<script type="module">` imports
- Event-driven — pub/sub pattern for cross-module communication
- Data-driven — game content lives in plain JS arrays, UI is generated from data

---

## Module Dependency Graph

```
app.js (entry point)
├── state.js ← data/characters.js
├── engine.js ← data/powers.js, data/synergy-rules.js, data/upgrades.js,
│                data/inspirations.js, data/masteries.js, data/tools.js,
│                data/artifacts.js
├── supabase.js ← state.js
└── ui/
    ├── topbar.js ← data/characters.js, supabase.js
    ├── tabs.js ← ui/search.js
    ├── powers-tab.js ← data/powers.js, engine.js, ui/format.js
    ├── tools-tab.js ← data/tools.js
    ├── artifacts-tab.js ← data/artifacts.js
    ├── masteries-tab.js ← data/masteries.js
    ├── inspirations-tab.js ← data/inspirations.js
    ├── upgrades-tab.js ← data/upgrades.js
    ├── sidebar.js ← engine.js
    └── mobile.js
```

All data modules (`js/data/*.js`) export plain arrays or objects. UI modules (`js/ui/*.js`) export `init*()` functions that render HTML and attach event listeners. The engine (`js/engine.js`) exports pure functions that compute stats and detect synergies.

---

## Init Flow

The bootstrap sequence in `js/app.js`:

```
DOMContentLoaded
  1. loadPersistedState()     — Restore all 5 localStorage keys instantly
  2. initTopbar()             — Character selector, theme toggle, auth button
  3. initTabs()               — Tab bar with global search input
  4. initPowersTab()          — Powers grid, filters, prerequisite logic
  5. initToolsTab()           — Tools grid
  6. initArtifactsTab()       — Artifacts grid
  7. initMasteriesTab()       — Masteries grid
  8. initInspirationsTab()    — Inspirations grid
  9. initSidebar()            — Build summary panel
 10. initUpgradesTab()        — HQ upgrades modal
 11. await initSupabase()     — Check auth session, merge cloud data if logged in
 12. applyTheme()             — Set CSS theme based on selected character
 13. initMobile()             — Mobile layout (must come after all other modules)
 14. renderActiveTab()        — Render the default 'powers' tab
```

Each `init*()` function subscribes to relevant events (`build-changed`, `tab-changed`, `filter-changed`, etc.) so subsequent state changes automatically re-render the affected UI.

---

## State Management

### Central State (`js/state.js`)

Five independent state objects, each persisted to its own localStorage key:

| Object | Storage Key | Contents |
|--------|------------|----------|
| `state` | `tmnt-sf-build` | Current run: character, powers, tool, artifact, masteries, inspirations, active tab, filters |
| `upgradeState` | `tmnt-sf-upgrades` | HQ upgrade levels (Dragon + Dreamer) |
| `settings` | `tmnt-sf-settings` | Auto-theme, theme mode, color stats toggle |
| `artifactUpgrades` | `tmnt-sf-artifact-upgrades` | Permanently unlocked artifact levels |
| `inspirationUpgrades` | `tmnt-sf-inspiration-upgrades` | Permanently unlocked inspiration levels |

### Event System

A lightweight pub/sub built into `state.js`:

```javascript
on(event, callback)   // Subscribe — returns unsubscribe function
emit(event, data)     // Publish (internal, not exported)
```

**Events:**
| Event | Emitted When |
|-------|-------------|
| `character-changed` | Character selected/deselected |
| `build-changed` | Any build modification (powers, tool, artifact, masteries, inspirations) |
| `tab-changed` | User switches tab |
| `filter-changed` | Type/slot/tier/search filter changes |
| `upgrades-changed` | HQ upgrade level modified |
| `artifact-upgrades-changed` | Permanent artifact level modified |
| `inspiration-upgrades-changed` | Permanent inspiration level modified |
| `settings-changed` | Any setting toggled |

### Mutation Functions

All state changes go through exported mutation functions (`selectCharacter()`, `addPower()`, `setTool()`, etc.) that:
1. Update the state object
2. Emit the appropriate event
3. Save to localStorage

UI modules never modify state directly — they call mutation functions and react to events.

---

## Stat Computation Pipeline

The stat engine in `js/engine.js` computes final character stats from all bonus sources.

### `computeCharacterStats(baseChar, upgradeState, buildState)`

**Input:** Base character stats + HQ upgrade levels + full build state

**Process:**
1. Sum HQ upgrade bonuses for each stat key (`upgrade.perLevel * level`)
2. Walk all build cards (powers, masteries, inspirations, tool, artifact) and collect `statBonuses`:
   - **Permanent bonuses** → accumulated into `perm[statKey]`
   - **Conditional bonuses** → pushed to `cond[]` array for separate display
3. Level-indexed values resolved via `resolveStatValue(bonus, level)`:
   ```
   values[min(level - 1, values.length - 1)]
   ```
4. Compute final stats:
   - **Percentage-scaled** (attack, dash, special, health): `Math.round(base * (1 + totalBonus / 100))`
   - **Pure-percentage** (crit chance, dodge, etc.): raw sum of all bonuses
   - **Flat additive** (dash charges, revives): base + HQ flat + build flat
   - **Health**: capped at `character.maxHealth`

**Output:** Object with 21 stat values + `conditionalBonuses[]` array.

### `resolveStatValue(bonus, level)`

Powers, tools, and artifacts scale with level. A `statBonuses` entry can have either:
- `value: 10` — fixed value regardless of level
- `values: [5, 10, 15]` — indexed by `level - 1`

### `collectBonuses(statBonuses, level, source, permanentAcc, conditionalAcc)`

Iterates a card's `statBonuses` array, resolves each value at the given level, and routes it to either the permanent accumulator object or the conditional array based on the `conditional` flag.

---

## Synergy & Prerequisite Engine

### `checkPrerequisites(buildPowerNames)` → `{ available, locked }`

Evaluates all secondary/legendary powers not yet in the build. Returns which ones are available (prerequisites met) and which are locked. Supports:
- Direct power name references (`"After Frost"`)
- OR patterns (`"After Quick Feet/First Strike"`)
- Dual prerequisites (`"After Frost + Inferno"`)
- Category references (`"After Dealing Water Damage"` → any water power in build)

### `getDependentsInBuild(powerName, buildPowerNames)` → `string[]`

Reverse lookup: finds all powers in the current build that depend on a given power. Used to prevent deselecting a prerequisite while dependents are still selected.

### `checkElementCombos(buildPowerNames)` → `{ elementCounts, nearComplete, complete }`

Tracks which element types are in the build and identifies legendary powers whose element combo requirements are met or nearly met.

### `checkMechanicalSynergies(build)` → synergy[]

Runs the full set of 100+ synergy rules from `js/data/synergy-rules.js` against the current build. Each rule has a `check(build)` function that returns `true` if the synergy is active.

### `calcBuildFocus(buildPowerNames)` → `{ level, label, typeCount, types }`

Counts distinct element types (excluding legendary) and classifies:
- **Focused** (1-2 types)
- **Balanced** (3-4 types)
- **Scattered** (5+ types)

### `runFullAnalysis(state, upgradeState)`

Convenience function that runs all analysis functions and returns a combined result object.

---

## Cloud Sync

### Configuration (`js/supabase.js`)

- **Provider:** Supabase (PostgreSQL)
- **Auth:** Discord OAuth via `signInWithOAuth()`
- **Table:** `user_upgrades` with columns: `user_id`, `upgrade_state`, `artifact_upgrades`, `inspiration_upgrades`

### Sync Flow

1. On page load: `initSupabase()` checks for existing session via `onAuthStateChange`
2. If logged in (returning session): Load cloud data, apply silently
3. If fresh sign-in with existing local data: Show merge prompt (Keep Local / Load Cloud)
4. If no cloud data exists: Upload local state (first login)
5. On upgrade change: Debounced save (2s delay) via `debouncedCloudSave()`
6. On logout: Stop sync listeners, keep localStorage intact

### What Syncs

Only permanent HQ-level data syncs to the cloud:
- Dragon/Dreamer upgrade levels
- Permanent artifact unlock levels
- Permanent inspiration unlock levels

Current-run build state (powers, tool, artifact, masteries) is **not** synced — it stays in localStorage only.

---

## CSS Architecture

### File Structure

| File | Lines | Purpose |
|------|-------|---------|
| `variables.css` | 282 | Design tokens: element colors, spacing scale, typography, border radii |
| `themes.css` | 542 | 14 theme definitions via `[data-theme="..."]` selectors |
| `layout.css` | 308 | Topbar, main grid (browse panel + sidebar), tab bar, filter bar |
| `components.css` | 1,301 | Cards, buttons, filters, badges, level controls, sidebar sections |
| `mobile.css` | 308 | Responsive styles for screens ≤900px |

### Design Tokens (`variables.css`)

- **Element colors:** `--el-water`, `--el-flame`, `--el-ooze`, `--el-utrom`, `--el-ninja`, `--el-light`, `--el-dark`, `--el-robotics`, `--el-legendary`
- **Mechanic tag colors:** `--el-attack`, `--el-crit`, `--el-dash`, `--el-speed`, `--el-special`, `--el-tool`, `--el-defense`, `--el-health`, `--el-boss`, `--el-general`, `--el-astral`
- **Spacing:** `--sp-1` (4px) through `--sp-8` (48px)
- **Typography:** `--font-display` (Bangers), `--font-sans` (DM Sans), `--text-xs` through `--text-2xl`

### Theme System (`themes.css`)

Each theme sets semantic color tokens:
- Surfaces: `--background`, `--foreground`, `--card`, `--surface`, `--popover`
- Interactive: `--primary`, `--secondary`, `--accent`, `--destructive`
- Text: `--text-secondary`, `--text-tertiary`
- Borders: `--border`, `--input`, `--ring`

Themes are applied by setting `data-theme` on `<html>`. Auto-theme maps the selected character to their theme via `characterThemeMap` in `js/data/characters.js`.

---

## Tab System

All 6 tabs share the same `#card-grid` and `#filter-bar` containers. Each tab's `init*()` function:

1. Subscribes to `tab-changed` — swaps filter pills and re-renders the grid when its tab becomes active
2. Subscribes to `filter-changed` — re-filters and re-renders the grid
3. Subscribes to `build-changed` — updates card states (selected, locked, available)

The global search input in the tab bar dispatches `filter-changed` events. Match counts for inactive tabs are displayed as badges on tab buttons.
