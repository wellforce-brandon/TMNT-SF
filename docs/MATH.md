# TMNT: Splintered Fate - Complete Math Reference

> **Purpose**: This document is a computational reference for TMNT: Splintered Fate. An LLM reading this file can calculate exact stat totals, damage output, and build potential for any character + build configuration. All data is sourced from the build planner codebase (`js/engine.js`, `js/data/*.js`).

## Table of Contents

This reference is split into focused files. Start here for core rules and formulas, then follow the links for specific topics.

| File | Contents |
|------|----------|
| **[MATH.md](MATH.md)** (this file) | Core rules, stat taxonomy, character base stats, formulas |
| **[MATH-BONUSES.md](MATH-BONUSES.md)** | All bonus sources: HQ upgrades, powers, masteries, inspirations, tools, artifacts |
| **[MATH-DAMAGE.md](MATH-DAMAGE.md)** | Damage walkthroughs (attack, dash, special, tool, elemental), critical hit math, multi-hit math |
| **[MATH-SURVIVABILITY.md](MATH-SURVIVABILITY.md)** | Health formula, dodge, heal effectiveness, revives, elemental DoT calculations (Ooze, Inferno, Electrified, Darkness) |
| **[MATH-DPS.md](MATH-DPS.md)** | DPS estimation framework, comparative examples, conditional bonus uptime guide |
| **[MATH-SYNERGIES.md](MATH-SYNERGIES.md)** | Power+Power synergies, Tool+Power synergies, Legendary prerequisites, Artifact combos |
| **[MATH-STAT-TABLES.md](MATH-STAT-TABLES.md)** | Per-stat lookup tables (all 21 stats, every source), non-tracked bonuses |

---

## 1. Core Rule: Additive Math

**ALL percentage bonuses in this game stack additively and apply to base values.**

There is no multiplicative stacking between bonus sources. If you have +60% from HQ upgrades and +30% from a mastery, the total bonus is +90%, not +60% then +30% on top.

```
WRONG: base * 1.60 * 1.30 = base * 2.08
RIGHT: base * (1 + (60 + 30) / 100) = base * 1.90
```

### Stat Keys

The engine tracks 21 stat keys. Every bonus in the game maps to one of these:

| Key | Display Name | Category |
|-----|-------------|----------|
| `attackDamage` | Attack Damage | Percentage-scaled |
| `dashAttackDamage` | Dash Attack Damage | Percentage-scaled |
| `specialAttack` | Special Attack | Percentage-scaled |
| `maxHealth` | Max Health | Percentage-scaled (capped) |
| `critChance` | Crit Chance | Pure-percentage |
| `critDamage` | Crit Damage | Pure-percentage |
| `multiHitChance` | Multi-Hit Chance | Pure-percentage |
| `multiHitDamage` | Multi-Hit Damage | Pure-percentage |
| `specialChargeRate` | Special Charge Rate | Pure-percentage |
| `specialCritChance` | Special Crit Chance | Pure-percentage |
| `toolDamage` | Tool Damage | Pure-percentage |
| `toolChargeRate` | Tool Charge Rate | Pure-percentage |
| `elementalDamage` | Elemental Damage | Pure-percentage |
| `negativeEffectDuration` | Neg. Effect Duration | Pure-percentage |
| `negativeEffectDamage` | Neg. Effect Damage | Pure-percentage |
| `dodgeChance` | Dodge Chance | Pure-percentage |
| `moveSpeed` | Move Speed | Pure-percentage |
| `healEffectiveness` | Heal Effectiveness | Pure-percentage |
| `maxHealthFlat` | Max Health (flat) | Flat additive |
| `dashCharges` | Dash Charges | Flat additive |
| `revives` | Revives | Flat additive |

### Level Resolution

Powers, tools, and artifacts scale with level. Stat bonuses use a `values` array indexed by level:

```
resolvedValue = values[min(level - 1, values.length - 1)]
```

Level is 1-indexed. A Level 2 power with `values: [20, 35, 50]` resolves to `values[1]` = 35.

---

## 2. Stat Taxonomy

### Percentage-Scaled Stats

These stats have a character base value. The final value = base multiplied by (1 + total bonus percentage / 100).

```
finalStat = Math.round(baseStat * (1 + totalPercentBonus / 100))
```

| Stat | Base Source | Notes |
|------|-----------|-------|
| `attackDamage` | `character.attackDamage` | Main attack damage |
| `dashAttackDamage` | `character.dashAttack` | Dash attack damage |
| `specialAttack` | `character.specialAttack` | Special ability damage |
| `maxHealth` | `character.health` | **Capped** at `character.maxHealth` |

### Pure-Percentage Stats

These have no base value. The final value is simply the sum of all bonuses from all sources.

```
finalStat = sum(all_bonuses_for_this_stat)
```

Stats: `critChance`, `critDamage`, `multiHitChance`, `multiHitDamage`, `specialChargeRate`, `specialCritChance`, `toolDamage`, `toolChargeRate`, `elementalDamage`, `negativeEffectDuration`, `negativeEffectDamage`, `dodgeChance`, `moveSpeed`, `healEffectiveness`

### Flat Additive Stats

These start from a fixed base and add flat values.

| Stat | Base | Notes |
|------|------|-------|
| `dashCharges` | 1 | +1 per HQ level, +1 from Quick Feet power |
| `revives` | 0 | +1 per HQ level, +1 from Revival/Spare Bot/Clan Hamato Seal |
| `maxHealthFlat` | 0 | Added to health AFTER percentage calculation, BEFORE cap |

---

## 3. Character Base Stats

| Character | health | maxHealth | attackDamage | dashAttack | specialAttack | specialChargeRate |
|-----------|--------|-----------|--------------|------------|---------------|-------------------|
| Michelangelo | 110 | 385 | 18 | 12 | 40 | 1.0 |
| Leonardo | 100 | 350 | 20 | 14 | 45 | 1.0 |
| Raphael | 120 | 420 | 24 | 16 | 50 | 0.9 |
| Donatello | 140 | 490 | 16 | 10 | 55 | 1.1 |
| Casey Jones | 100 | 350 | 22 | 15 | 42 | 1.0 |
| Metalhead | 80 | 280 | 26 | 18 | 60 | 0.8 |

**Notes:**
- `specialChargeRate` is a base multiplier on charge speed (0.8 = 20% slower, 1.1 = 10% faster). HQ/power bonuses to `specialChargeRate` are additive percentage bonuses ON TOP of this.
- Each character has 2 starting inspirations that begin at level 1 when that character is selected.
- `maxHealth` is a hard cap that the health stat can never exceed, regardless of bonuses applied.

### Character Profiles

- **Metalhead**: Highest raw damage (26 atk, 18 dash, 60 special) but lowest health pool (80/280). Glass cannon.
- **Donatello**: Tankiest (140/490 HP), highest special (55), fastest charge (1.1x), but lowest attack/dash (16/10). Special-focused.
- **Raphael**: High attack (24), high health (120/420), slowest charge (0.9x). Crit-focused character.
- **Casey Jones**: Balanced offensive stats (22 atk, 15 dash, 42 special). Well-rounded.
- **Leonardo**: Balanced (20 atk, 14 dash, 45 special). Master Strike-focused.
- **Michelangelo**: Lowest attack (18) but good special (40) and health (110/385). Elemental/Multi-Hit focused.

---

## 4. Core Formulas

### Formula 1: Percentage-Scaled Stat

```
totalPercentBonus = HQ_upgrade_bonus(stat) + sum(permanent_build_bonuses(stat))

finalStat = Math.round(baseStat * (1 + totalPercentBonus / 100))
```

Where:
- `HQ_upgrade_bonus(stat)` = `upgrade.perLevel * upgradeLevel` for each upgrade where `upgrade.stat == stat`
- `permanent_build_bonuses(stat)` = sum of all non-conditional `statBonuses` from: powers, masteries, inspirations, tool, artifact

### Formula 2: Pure-Percentage Stat

```
finalStat = HQ_upgrade_bonus(stat) + sum(permanent_build_bonuses(stat))
```

No base. No multiplication. Just a raw total.

### Formula 3: Flat Stats

```
dashCharges = 1 + HQ_dashCharge_level + build_flat_dashCharges
revives     = 0 + HQ_revive_level + build_flat_revives
```

HQ Dash Charge upgrade has `levelValues: [1, 2, 3]` (level 1 = +1 charge, level 2 = +2, level 3 = +3).
HQ Splinter's Revive upgrade has `levelValues: [1, 2, 3]`.

### Formula 4: Health (Capped)

```
maxHealthPct = HQ_bonus('maxHealth') + build_permanent_bonuses('maxHealth')
maxHealthFlat = build_permanent_bonuses('maxHealthFlat')

health = Math.min(
  Math.round(character.health * (1 + maxHealthPct / 100)) + maxHealthFlat,
  character.maxHealth
)
```

**Critical**: Health is hard-capped at `character.maxHealth`. Investment beyond the cap is wasted.

### Health Cap Breakpoints

The percentage bonus at which each character hits their health cap (with no flat bonuses):

| Character | base | max | Required % | HQ Levels Needed (at 10%/level) |
|-----------|------|-----|-----------|-------------------------------|
| Michelangelo | 110 | 385 | 250% | 25 (exact max) |
| Leonardo | 100 | 350 | 250% | 25 (exact max) |
| Raphael | 120 | 420 | 250% | 25 (exact max) |
| Donatello | 140 | 490 | 250% | 25 (exact max) |
| Casey Jones | 100 | 350 | 250% | 25 (exact max) |
| Metalhead | 80 | 280 | 250% | 25 (exact max) |

All characters reach their max health at exactly HQ Health Level 25 (250%) with no other bonuses. Build bonuses to `maxHealth` (like Techno-Organic Interface +10/20/30%) allow reaching the cap with fewer HQ levels. `maxHealthFlat` bonuses (like Revival +30/60) add ON TOP of the percentage calculation but are still subject to the cap.

**Example with build bonuses:**
```
Donatello with HQ Health Lv20 (+200%) and Techno-Organic Interface Lv3 (+30% maxHealth) and Revival Lv2 (+60 flat):
health = Math.min(Math.round(140 * (1 + 230/100)) + 60, 490)
       = Math.min(Math.round(140 * 3.3) + 60, 490)
       = Math.min(462 + 60, 490)
       = Math.min(522, 490)
       = 490 (CAPPED)
```
