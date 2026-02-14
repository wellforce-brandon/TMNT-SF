# Contributing

> Back to [README](../README.md)

How to add game content, data schemas, and coding conventions for the TMNT: Splintered Fate Run Companion.

---

## Project Setup

```bash
git clone <repo-url>
cd TMNT-SF

# Any static server works — no install or build step
npx serve .
# or
docker-compose up     # → http://localhost:8080
# or
python -m http.server 8080
```

Open `http://localhost:8080` in a modern browser. Changes to JS/CSS files take effect on page reload.

---

## Adding a Power

**File:** `js/data/powers.js`

Powers are grouped by element type with comments separating each section. Add new entries in the appropriate element section.

### Schema

```javascript
{
  name: 'Power Name',              // Unique identifier, used everywhere
  type: 'water',                   // Element: water | flame | ooze | utrom | ninja | light | dark | robotics | legendary
  slot: 'strike',                  // Slot: strike | dash | ability | passive | special
  effect: '+20% / 30% / 40% ...',  // Effect text, "/" separated for levels 1/2/3
  tier: 'initial',                 // Tier: initial | secondary (legendaries are secondary)
  requires: null,                  // Prerequisite string, or null for initial powers
  combo: null,                     // For legendaries: ['element1', 'element2'], otherwise null
  requiredPowers: null,            // For legendaries: ['Power A', 'Power B'], otherwise null
  statBonuses: [...]               // Optional: array of stat bonus objects (see below)
}
```

### Prerequisite Formats

| Format | Example | Meaning |
|--------|---------|---------|
| Direct name | `'After Frost'` | Requires the specific power "Frost" |
| OR pattern | `'After Quick Feet/First Strike'` | Requires either power |
| Dual | `'After Frost + Inferno'` | Requires both powers |
| Category | `'After Dealing Water Damage'` | Requires any water-type power |

Supported categories: `Dealing Water Damage`, `Dealing Flame Damage`, `Dealing Utrom Damage`, `Applying Ooze`, `Charge`, `Darkness`, `Light`

### Legendary Power Example

```javascript
{
  name: 'Frostfire',
  type: 'legendary',
  slot: 'passive',
  effect: '+30% Water and Flame damage to opposite-element afflicted enemies',
  tier: 'secondary',
  requires: null,
  combo: ['water', 'flame'],
  requiredPowers: ['Frost', 'Dealing Flame Damage']
}
```

### statBonuses Array

Any power, tool, artifact, mastery, or inspiration can have a `statBonuses` array:

```javascript
statBonuses: [
  // Fixed value (same at all levels)
  { stat: 'critChance', value: 20 },

  // Level-scaled values (indexed by level - 1)
  { stat: 'attackDamage', values: [20, 35, 50] },

  // Conditional bonus (displayed separately in sidebar)
  { stat: 'moveSpeed', value: 20, conditional: true, condition: '3s on kill' }
]
```

**Valid stat keys:** `attackDamage`, `dashAttackDamage`, `specialAttack`, `maxHealth`, `critChance`, `critDamage`, `multiHitChance`, `multiHitDamage`, `specialChargeRate`, `specialCritChance`, `toolDamage`, `toolChargeRate`, `elementalDamage`, `negativeEffectDuration`, `negativeEffectDamage`, `dodgeChance`, `moveSpeed`, `healEffectiveness`, `maxHealthFlat`, `dashCharges`, `revives`

---

## Adding a Tool

**File:** `js/data/tools.js`

### Schema

```javascript
{
  name: 'Tool Name',               // Unique identifier
  effect: 'Deal 30 / 50 / 100 ...',// Effect text with "/" level scaling
  element: 'flame',                // Element tag: water | flame | ooze | utrom | physical | null
  chargeRate: 1.0,                 // Base charge speed multiplier (< 1 = slower, > 1 = faster)
  statBonuses: [...]               // Optional: stat bonus array
}
```

### Example

```javascript
{
  name: 'Fireball',
  effect: 'Fire 4 seeking fireballs towards nearby enemies. Each fireball deals 30 / 50 / 100 Flame damage in an area upon impact.',
  element: 'flame',
  chargeRate: 1.0
}
```

Tools with `statBonuses` (like The Juice or Smoke Bomb) have their bonuses aggregated by the stat engine when equipped.

---

## Adding an Artifact

**File:** `js/data/artifacts.js`

### Schema

```javascript
{
  name: 'Artifact Name',           // Unique identifier
  effect: '+10% / +15% / +20%...', // Effect text with "/" level scaling
  maxLevel: 6,                     // Maximum level (3-6)
  tags: ['water'],                 // Tag array for display and filtering
  category: 'element',             // Category: element | utility
  statBonuses: [...]               // Optional: stat bonus array
}
```

### Example

```javascript
{
  name: 'Heart of Tengu',
  effect: '+5% / +7.5% / +10% / +12.5% / +15% / +17.5% Dodge chance.',
  maxLevel: 6,
  tags: ['ninja', 'defense'],
  category: 'utility',
  statBonuses: [{ stat: 'dodgeChance', values: [5, 7.5, 10, 12.5, 15, 17.5] }]
}
```

Element-boosting artifacts (category `'element'`) always have `maxLevel: 6` and affect offering rates. Utility artifacts vary in `maxLevel`.

---

## Adding a Mastery

**File:** `js/data/masteries.js`

Masteries are character-specific. Add entries in the character's section.

### Schema

```javascript
{
  character: 'michelangelo',        // Character ID
  name: '+10% Elemental damage',   // Same as effect (no official names)
  effect: '+10% Elemental damage', // Display text
  tags: ['elemental', 'attack'],   // Tags for filtering and display
  statBonuses: [...]               // Optional: stat bonus array
}
```

### Example with statBonuses

```javascript
{
  character: 'michelangelo',
  name: '+20% Damage dealt and Move Speed for 3s after defeating an enemy',
  effect: '+20% Damage dealt and Move Speed for 3s after defeating an enemy',
  tags: ['attack', 'speed'],
  statBonuses: [
    { stat: 'attackDamage', value: 20, conditional: true, condition: '3s on kill' },
    { stat: 'moveSpeed', value: 20, conditional: true, condition: '3s on kill' }
  ]
}
```

### Available Tags

`attack`, `crit`, `dash`, `speed`, `special`, `tool`, `shuriken`, `defense`, `health`, `boss`, `barrier`, `elemental`, `general`, `astral`

Each tag has a corresponding color defined in `css/variables.css` (`--el-attack`, `--el-crit`, etc.).

---

## Adding an Inspiration

**File:** `js/data/inspirations.js`

Each character has exactly 2 inspirations. These are referenced by name in `js/data/characters.js` as starting inspirations.

### Schema

```javascript
{
  character: 'raphael',             // Character ID
  name: 'Raphael Inspiration 1',   // Unique identifier
  effect: '+5% / +10% / +15% ...',  // Effect text with "/" level scaling
  maxLevel: 3,                     // Maximum level (2 or 3)
  statBonuses: [...]               // Optional: stat bonus array
}
```

### Example

```javascript
{
  character: 'raphael',
  name: 'Raphael Inspiration 2',
  effect: '+3% / +6% / +9% Attack Critical Hit chance. +3% / +6% / +9% Critical Damage.',
  maxLevel: 3,
  statBonuses: [
    { stat: 'critChance', values: [3, 6, 9] },
    { stat: 'critDamage', values: [3, 6, 9] }
  ]
}
```

If adding a new character, also update `js/data/characters.js` to reference the new inspiration names in the character's `inspirations` array.

---

## Adding an HQ Upgrade

**File:** `js/data/upgrades.js`

### Schema

```javascript
{
  name: 'camelCaseKey',             // Unique camelCase key (used as state key)
  displayName: 'Display Name',     // Human-readable name shown in UI
  currency: 'dragon',              // Currency: dragon | dreamer
  maxLevel: 10,                    // Maximum upgrade level
  stat: 'critChance',              // Stat key to modify, or null if no direct stat
  perLevel: 2,                     // Value increment per level
  maxEffect: 20,                   // Total at max level (perLevel * maxLevel)
  description: 'Description text.',// Tooltip/description
  category: 'combat',              // Category: combat | meta
  suffix: '%'                      // Optional: display suffix (%, /room, etc.)
}
```

### Example

```javascript
{
  name: 'critChance',
  displayName: 'Critical Chance',
  currency: 'dragon',
  maxLevel: 10,
  stat: 'critChance',
  perLevel: 2,
  maxEffect: 20,
  description: 'Increases critical hit chance.',
  category: 'combat'
}
```

Upgrades with `stat: null` (like Confidence, Starting Pizza) do not feed into the stat engine — they affect gameplay but are not computed.

---

## Adding a Synergy Rule

**File:** `js/data/synergy-rules.js`

### Schema

```javascript
{
  id: 'kebab-case-id',             // Unique kebab-case identifier
  name: 'Synergy Name',           // Display name
  description: 'What this combo does and why it matters.',
  category: 'combo',               // Category: combo | tool-combo | legendary-path | artifact-combo
  check(build) {                   // Function that returns true if synergy is active
    return hasAll(build, 'Power A', 'Power B');
  }
}
```

### Build Object Shape

The `build` argument passed to `check()`:

```javascript
{
  powers: string[],    // Array of power names in the build
  tool: string | null, // Equipped tool name
  artifact: string | null, // Equipped artifact name
  masteries: string[]  // Array of mastery names
}
```

### Helper Functions

Available at the top of `synergy-rules.js`:

```javascript
hasAll(build, ...names)    // True if ALL named powers are in build
hasAny(build, ...names)    // True if ANY named power is in build
```

### Element Power Arrays

Pre-defined arrays for type checking: `FLAME_POWERS`, `WATER_POWERS`, `OOZE_POWERS`, `UTROM_POWERS`, `NINJA_POWERS`, `LIGHT_POWERS`, `DARK_POWERS`, `ASTRAL_POWERS`, `ROBOTICS_POWERS`, `CHARGE_POWERS`

Tool arrays: `SHURIKEN_TOOLS`, `FLAME_TOOLS`, `OOZE_TOOLS`, `UTROM_TOOLS`, `WATER_TOOLS`

### Example

```javascript
{
  id: 'crit-engine',
  name: 'Crit Engine',
  description: 'Furious Attacks gives crit chance, Precision boosts crit damage, Incendiary Strikes adds Flame damage on crit. Full crit loop online.',
  category: 'combo',
  check(build) {
    return hasAll(build, 'Furious Attacks', 'Precision', 'Incendiary Strikes');
  }
}
```

---

## Adding a Stat Key

If the game adds a new stat that should be tracked:

1. **`js/engine.js`** — Add the stat to `computeCharacterStats()` return object
2. **`js/ui/sidebar.js`** — Add the stat to the appropriate stat group in the sidebar render, and add a label to `STAT_LABELS`
3. **Data files** — Add `statBonuses` entries referencing the new stat key to relevant powers, masteries, etc.
4. **`docs/MATH-STAT-TABLES.md`** — Add a lookup table for the new stat

---

## CSS Conventions

- **Element colors** are defined in `css/variables.css` as `--el-{type}` (e.g., `--el-water`, `--el-flame`)
- **Tag colors** for mechanic tags use `--el-{tag}` (e.g., `--el-attack`, `--el-crit`)
- **Spacing** uses the `--sp-{n}` scale (1=4px, 2=8px, 3=12px, 4=16px, 5=24px, 6=32px, 8=48px)
- **Typography** uses `--text-{size}` variables (xs, sm, base, lg, xl, 2xl)
- **Theme-aware colors** use semantic tokens (`--primary`, `--foreground`, `--card`, etc.) — never hardcode colors
- **Component classes** follow a flat naming pattern: `.card`, `.card-title`, `.card-effect`, `.card-tags` (not BEM)

## Code Conventions

- **ES6 modules** — all files use `export` / `import`
- **No framework** — DOM manipulation via `innerHTML`, `createElement`, `addEventListener`
- **Event-driven** — state changes emit events, UI modules subscribe and re-render
- **State mutations** — always go through exported functions in `state.js`, never modify state objects directly from UI code
- **No build tools** — no webpack, vite, or transpilation. Ship source directly
- **Data as source of truth** — UI is generated from data arrays, not hardcoded HTML
