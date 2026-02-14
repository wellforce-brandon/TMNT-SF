# TMNT: Splintered Fate — Run Companion

An interactive build planner and run companion for **Teenage Mutant Ninja Turtles: Splintered Fate**. Browse powers, tools, artifacts, masteries, and inspirations — see synergies detected in real time and track computed stats for any character build.

**Live:** [tmnt-sf.vercel.app](https://tmnt-sf.vercel.app)

---

## Tech Stack

- **Vanilla JavaScript** — ES6 modules, no framework, no build step
- **CSS Custom Properties** — 14 character themes, dark/light variants
- **Supabase** — Discord OAuth + cloud save for HQ upgrades
- **Docker / Vercel** — Static hosting, zero config

## Quick Start

```bash
# Any static server works
npx serve .

# Or with Docker
docker-compose up
# → http://localhost:8080
```

No install, no build, no transpilation. Open `index.html` in a browser.

## Features

- **6 playable characters** with unique base stats, default tools, and starting inspirations
- **165+ powers** across 9 element types with prerequisite chains and tier progression
- **18 tools**, **24 artifacts**, **84 masteries**, **12 inspirations** — all browsable with filters and search
- **Real-time synergy detection** — 100+ rules that light up as you build
- **Computed stat engine** — aggregates HQ upgrades + all build card bonuses, shows conditional bonuses separately
- **Build focus meter** — Focused / Balanced / Scattered rating based on element spread
- **14 character themes** — auto-switches on character select, manual light/dark toggle
- **Cloud save** — Discord login syncs HQ upgrades, artifact levels, and inspiration levels
- **Mobile-responsive** — bottom nav, character picker overlay, full sidebar view at 900px breakpoint
- **Global search** — cross-tab search with match count badges

## Project Structure

```
index.html              Entry point (single-page app)
css/
  variables.css         Design tokens: colors, spacing, typography
  themes.css            14 character theme definitions
  layout.css            Grid system, panels, topbar
  components.css        Cards, buttons, filters, sidebar, badges
  mobile.css            Responsive styles (≤900px)
js/
  app.js                Bootstrap & init sequence
  state.js              Central state, mutations, events, localStorage
  engine.js             Stat computation, synergy detection, prerequisites
  supabase.js           Discord OAuth, cloud sync
  ui/
    topbar.js            Character selector, theme toggle, auth button
    tabs.js              Tab bar, global search
    powers-tab.js        Powers grid with prerequisite & tier logic
    tools-tab.js         Tools grid
    artifacts-tab.js     Artifacts grid with permanent upgrades
    masteries-tab.js     Character-specific masteries grid
    inspirations-tab.js  Inspirations grid with permanent upgrades
    upgrades-tab.js      HQ upgrades modal (Dragon/Dreamer powers)
    sidebar.js           Build summary: stats, equipped items, synergies
    mobile.js            Mobile layout orchestrator
    format.js            Shared card rendering helpers
    search.js            Cross-tab search logic
  data/
    characters.js        6 characters with base stats
    powers.js            165+ powers with effects, tiers, prerequisites
    tools.js             18 tools with charge rates
    artifacts.js         24 artifacts with tags and categories
    masteries.js         84 character-specific masteries
    inspirations.js      12 inspirations (2 per character)
    upgrades.js          40 HQ upgrades (23 Dragon, 17 Dreamer)
    synergy-rules.js     100+ synergy detection rules
docs/
    MATH.md              Math reference index — formulas, base stats
    MATH-BONUSES.md      All stat bonus sources
    MATH-DAMAGE.md       Damage calculation walkthroughs
    MATH-SURVIVABILITY.md  Health, dodge, DoT calculations
    MATH-DPS.md          DPS estimation framework
    MATH-SYNERGIES.md    Synergy & legendary prerequisite tables
    MATH-STAT-TABLES.md  Per-stat lookup tables (all 21 stats)
assets/
    logo.png             App logo
    faces/               Character portrait images
    nameplates/          Character nameplate images
```

## Documentation

| Document | Contents |
|----------|----------|
| [Architecture](docs/ARCHITECTURE.md) | Module system, state management, init flow, engines, CSS architecture |
| [Features](docs/FEATURES.md) | Complete feature catalog organized by UI area |
| [Contributing](docs/CONTRIBUTING.md) | How to add game content: data schemas, conventions, examples |
| [Math Reference](docs/MATH.md) | Computational reference: formulas, stat tables, damage math, synergies |
