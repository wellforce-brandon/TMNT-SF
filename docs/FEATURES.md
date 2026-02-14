# Features

> Back to [README](../README.md)

Complete catalog of every feature in the TMNT: Splintered Fate Run Companion.

---

## Character System

6 playable characters, each with unique base stats:

| Character | HP | Max HP | Attack | Dash | Special | Charge Rate | Default Tool |
|-----------|----|--------|--------|------|---------|-------------|-------------|
| Michelangelo | 110 | 385 | 18 | 12 | 40 | 1.0x | Taunt |
| Leonardo | 100 | 350 | 20 | 14 | 45 | 1.0x | Shuriken |
| Raphael | 120 | 420 | 24 | 16 | 50 | 0.9x | Turtle Line |
| Donatello | 140 | 490 | 16 | 10 | 55 | 1.1x | Hardened Shell |
| Casey Jones | 100 | 350 | 22 | 15 | 42 | 1.0x | The Juice |
| Metalhead | 80 | 280 | 26 | 18 | 60 | 0.8x | Landmines |

- Selecting a character auto-equips their default tool and starting inspirations
- Auto-theme switches the color scheme to match the selected character
- Deselecting a character clears masteries and inspirations (character-specific)

---

## Powers Tab

**165+ powers** organized by element type and tier.

### Element Types (9)
Water, Flame, Ooze, Utrom, Ninja, Light, Dark, Robotics, Legendary

### Slots (5)
Strike, Dash, Ability, Passive, Special

### Tier System
- **Initial (T1):** Available from the start, no prerequisites
- **Secondary (T2-T3):** Require a specific initial power or element category to unlock
- **Legendary:** Require two specific element-typed powers (shown as element combo)

### Filters
- **Type pills:** Filter by element type (multi-select, toggle on/off)
- **Slot dropdown:** All / Strike / Dash / Ability / Passive / Special
- **Tier dropdown:** All / Initial / Secondary

### Power Cards
- Click to add/remove from build
- Level controls (+/-) for levels 1-3
- Tier badge shows pizza slice icons (1-3 slices by tier)
- Prerequisite text shown on locked cards
- Synergy highlight border when adding this power would complete a combo
- Dependency lock prevents removing a power that other build powers depend on

---

## Tools Tab

**18 tools** available during runs.

- Each tool has 3 upgrade levels with scaling values in the effect text
- Exclusive selection — only 1 tool equipped at a time
- Element tag shown on applicable tools (water, flame, ooze, utrom, physical)
- Level controls (+/-) for levels 1-3
- Charge rate displayed per tool (affects recharge speed)
- Click to equip/unequip; clicking an equipped tool unequips it

---

## Artifacts Tab

**24 artifacts** split into two categories.

### Element-Boosting (7 artifacts, 6 levels each)
Increase the offering rate for a specific element type during runs.

### Utility (17 artifacts, 3-6 levels each)
Provide combat bonuses like dodge chance, revives, crit damage, or special effects. Some have `statBonuses` that feed into the stat engine.

### Permanent Upgrades
Artifacts can be permanently upgraded via HQ to start at a higher level. The minimum level is enforced — the in-run level slider cannot go below the permanent unlock level.

### Artifact Cards
- Click to equip/unequip
- Level controls (+/-) from 1 to `maxLevel`
- Tags displayed as colored pills
- Permanent upgrade level shown when unlocked above level 1

---

## Masteries Tab

**84 character-specific masteries** (14-15 per character).

- Only shows masteries for the currently selected character
- Multi-select — any combination can be chosen
- Color-coded tags for quick identification: attack (red), crit (orange), dash (blue), speed (green), special (purple), tool (teal), defense (gray), health (pink), boss (dark red), elemental (varies), etc.
- Some masteries have `statBonuses` arrays that feed into the stat engine
- Masteries have no official in-game names — the effect text IS the identifier
- Search filters by effect text and tags

---

## Inspirations Tab

**12 inspirations** (2 per character).

- When a character is selected, their 2 starting inspirations are auto-equipped and cannot be removed
- Any character's inspirations can be added to the current build (cross-character selection)
- Level controls from 1 to `maxLevel` (2 or 3 depending on inspiration)
- Permanent upgrades set a minimum starting level (similar to artifacts)
- Some inspirations have `statBonuses` arrays that feed into the stat engine

---

## HQ Upgrades

Accessed via the settings gear icon or the "HQ Upgrades" tab.

### Dragon Powers (23 upgrades)
Combat and utility upgrades that directly affect stats. Each has a `stat` key, `perLevel` increment, and `maxLevel`. Includes Attack Damage, Critical Chance, Critical Damage, Health, Dodge, Special Damage, Tool Damage, and more.

### Dreamer Powers (17 upgrades)
Meta-progression upgrades that affect economy and run setup. Includes Starting Pizza, Scrap Gain, Shop Discounts, Power Rarity, and more. These do NOT have stat keys — they affect the meta-game, not computed stats.

### Controls
- Per-upgrade slider from 0 to maxLevel
- **Max All** button per section (sets all upgrades to max)
- **Reset All** button per section (sets all upgrades to 0)
- Redirect tabs for Artifacts and Inspirations permanent upgrades

### Settings Section
- **Auto-Theme:** Toggle automatic theme switching on character select
- **Theme Mode:** Light / Dark toggle
- **Color Stats:** Toggle color-coding of stat groups in the sidebar

---

## Sidebar (Current Run)

The right panel displays the complete build summary.

### Character Nameplate
Shows the selected character's nameplate image.

### Computed Stats (6 Groups)

1. **Attack** — Attack Damage (final), Crit Chance (%), Crit Damage (%), Multi-Hit Chance (%), Multi-Hit Damage (%)
2. **Dash** — Dash Damage (final), Dash Charges (count)
3. **Special** — Special Damage (final), Charge Rate (%), Special Crit Chance (%)
4. **Tool** — Tool Damage (%), Tool Charge Rate (%) — only shown if bonuses exist
5. **Elemental** — Elemental Damage (%), Effect Duration (%), Effect Damage (%) — only shown if bonuses exist
6. **Defense / Utility** — Health (capped), Dodge Chance (%), Move Speed (%), Heal Effectiveness (%), Revives (count)

Percentage-scaled stats show the final computed value (base multiplied by bonus). Pure-percentage stats show the raw total. Color-coding can be toggled in settings.

### Conditional Bonuses
Displayed separately below the stat groups. Shows conditional stat bonuses with their trigger condition (e.g., "+20% Attack Dmg — 3s on kill"). These bonuses are not included in the main stat values.

### Equipped Items
- **Tool:** Name, level, remove button
- **Artifact:** Name, level, remove button

### Build Contents
- **Powers:** Grouped by element type with count badges, level shown, removable
- **Masteries:** Listed with count badge, removable
- **Inspirations:** Listed with level, removable (except starting inspirations)

### Build Focus Meter
Visual indicator based on the number of distinct element types in the build:
- **Focused** (1-2 types) — Green
- **Balanced** (3-4 types) — Yellow
- **Scattered** (5+ types) — Red

### Active Synergies
Lists all synergy rules that are currently active based on the build. Shows synergy name and description. Grouped by category (combo, tool-combo, legendary-path, artifact-combo).

---

## Search System

A single search input in the tab bar that works across all tabs.

- Filters cards in real time as you type
- Searches against card name, effect text, and tags
- Match count badges appear on inactive tab buttons showing how many results each tab has
- Clear button (X) resets the search
- On mobile, the search input is duplicated in the filter bar for easier access

---

## Theme System

**14 themes** — one dark and one light variant for each of the 6 characters, plus 2 default themes.

| Theme | Mode | Based On |
|-------|------|----------|
| Sewer Dwellers | Dark | Default |
| Turtle Power | Light | Default |
| Hot Head | Dark | Raphael |
| Raphael Light | Light | Raphael |
| Party Dude | Dark | Michelangelo |
| Michelangelo Light | Light | Michelangelo |
| Leader | Dark | Leonardo |
| Leonardo Light | Light | Leonardo |
| Tech Genius | Dark | Donatello |
| Donatello Light | Light | Donatello |
| Casey Jones | Dark | Casey |
| Casey Jones Light | Light | Casey |
| Metalhead | Dark | Metalhead |
| Metalhead Light | Light | Metalhead |

### Auto-Theme
When enabled (default), selecting a character automatically switches to their theme. The dark/light variant respects the current theme mode toggle.

### Theme Application
Themes are applied by setting `data-theme` on the `<html>` element. All semantic colors are defined as CSS custom properties within `[data-theme="..."]` selectors in `css/themes.css`.

---

## Cloud Save

### Authentication
- Discord OAuth via Supabase
- Login button in the topbar
- Shows Discord avatar when logged in

### What Syncs
- HQ Dragon/Dreamer upgrade levels
- Permanent artifact unlock levels
- Permanent inspiration unlock levels

### What Does NOT Sync
- Current run build (powers, tool, artifact, masteries, inspirations)
- Settings (theme mode, auto-theme, color stats)
- Filter/tab state

### Merge Behavior
- **Returning session:** Cloud data loads silently
- **Fresh login with local data:** Prompt asks "Keep Current" or "Load Cloud Data"
- **First login:** Local data uploads to cloud
- **Offline:** Full functionality via localStorage, sync resumes on next login

---

## Mobile UI

Activates at screen widths ≤ 900px.

### Character Picker
Full-screen overlay on first load (or when no character selected) with a 2x3 grid of character portraits.

### Bottom Navigation (3 tabs)
1. **Build** — Shows Powers/Tools/Artifacts/Masteries/Inspirations with a sub-toggle row
2. **HQ** — Shows HQ Upgrades
3. **Summary** — Full-screen sidebar view with all stats, equipped items, and synergies

### Mobile Adaptations
- Topbar shows character face + name instead of full selector
- Character indicator in topbar opens the character picker overlay
- Cards use a single-column layout
- Filter bar is simplified
- Search input duplicated within filter bar per tab
