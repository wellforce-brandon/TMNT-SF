# Damage & Critical Hit & Multi-Hit Math

> Back to [Math Reference Index](MATH.md)

---

## Damage Calculation Walkthroughs

### Attack Damage

```
Example: Raphael
  Base attackDamage: 24
  HQ Attack Damage Lv10: +100%
  Mastery "+15% Attack area/damage": N/A (not available for Raph)
  Michelangelo Inspiration 1 Lv3 (if Mikey selected): +15% attackDamage

Scenario: Raphael, HQ Attack Lv10 only
  totalBonus = 100
  finalAttack = Math.round(24 * (1 + 100/100)) = Math.round(24 * 2.0) = 48

Scenario: Raphael, HQ Attack Lv16 (maxed)
  totalBonus = 160
  finalAttack = Math.round(24 * (1 + 160/100)) = Math.round(24 * 2.6) = 62
```

### Dash Attack Damage

```
Example: Metalhead
  Base dashAttack: 18
  HQ Fast Attacks Lv10: +100% dashAttackDamage
  Mastery "+30% Dash Attack damage": +30%

  totalDashBonus = 100 + 30 = 130
  finalDash = Math.round(18 * (1 + 130/100)) = Math.round(18 * 2.3) = 41
```

### Special Attack Damage

```
Example: Donatello
  Base specialAttack: 55
  HQ Special Damage Lv17: +170% specialAttack
  Mastery "+75% Special damage": +75%

  totalSpecialBonus = 170 + 75 = 245
  finalSpecial = Math.round(55 * (1 + 245/100)) = Math.round(55 * 3.45) = 190
```

### Tool Damage

The `toolDamage` stat is a pure-percentage global modifier. Tool base damage values come from each tool's effect text, NOT from the character's stats.

```
Example: Fireball tool at Level 3
  Base damage per fireball: 100 (from effect text: "30 / 50 / 100 Flame damage")
  HQ Tool Damage Lv10: +150% toolDamage

  effectiveToolDamage = 100 * (1 + 150/100) = 100 * 2.5 = 250 per fireball
  Fireball fires 4 projectiles = 1000 total potential damage
```

### Elemental Damage

The `elementalDamage` stat is a global percentage modifier applied to ALL elemental damage dealt. Individual element-type bonuses (like mastery "+30% Water damage" or "+30% Flame damage") are game-engine effects NOT tracked by the stat engine -- they exist only as text effects and stack with `elementalDamage`.

```
Example: Mikey with HQ Focused Forces Lv10 (+75%) and Mastery "+10% Elemental damage"
  elementalDamage = 75 + 10 = 85%
  A Water Attack that normally deals 25 damage would deal:
  25 * (1 + 85/100) = 25 * 1.85 = 46.25 elemental damage
```

---

## Critical Hit Math

### Attack Crits

```
critChance = sum of all critChance sources (pure-percentage)
critDamage = sum of all critDamage sources (pure-percentage)

normalHit = finalAttackDamage
critHit = finalAttackDamage * (1 + critDamage / 100)
```

There are no diminishing returns. 100%+ critChance means every hit is a crit.

### Special Crits

Special attacks use a SEPARATE crit stat: `specialCritChance`. This is independent from `critChance`.

```
specialCritChance = sum of all specialCritChance sources
critDamage = shared with attack crits (same pool)

specialCritHit = finalSpecialAttack * (1 + critDamage / 100)
```

### Worked Example: Maximum Crit Build (Raphael)

```
Raphael base attack: 24

--- Attack Bonus ---
HQ Attack Damage Lv16: +160%
finalAttack = Math.round(24 * 2.6) = 62

--- Crit Chance ---
HQ Critical Chance Lv10: +20%
Furious Attacks Lv3: +50%
Mastery "+20% Attack Critical Hit chance": +20%
Raphael Inspiration 2 Lv3: +9%
TOTAL critChance = 20 + 50 + 20 + 9 = 99%

--- Crit Damage ---
HQ Critical Damage Lv10: +50%
Precision Lv3: +180%
Mastery "+50% Critical Hit damage": +50%
Raphael Inspiration 2 Lv3: +9%
TOTAL critDamage = 50 + 180 + 50 + 9 = 289%

--- Damage Output ---
Normal hit: 62
Crit hit: 62 * (1 + 289/100) = 62 * 3.89 = 241.18

Average hit (at 99% crit): 62 * 0.01 + 241.18 * 0.99 = 0.62 + 238.77 = 239.39

--- Conditional additions possible ---
Ninjutsu Tactics Lv3: +25% critChance on Dodge (2-3s)
  -> Pushes to 124% critChance (guaranteed crit + overflow)
Mastery "+3% Crit damage per kill": stacking (unbounded)
  -> After 10 kills: +30% more critDamage = 319% total
  -> Crit hit after 10 kills: 62 * 4.19 = 259.78
```

### Special Crit Example (Raphael)

```
Raphael base special: 50
HQ Special Damage Lv17: +170%
Mastery "+30% Special damage": +30%
finalSpecial = Math.round(50 * (1 + 200/100)) = Math.round(50 * 3.0) = 150

specialCritChance:
  Mastery "+20% Special Critical Hit chance": +20%
  Raphael Inspiration 1 Lv3: +15%
  TOTAL: 35%

critDamage = 289% (shared, from above)

Special crit hit: 150 * 3.89 = 583.5
Average special: 150 * 0.65 + 583.5 * 0.35 = 97.5 + 204.23 = 301.73
```

---

## Multi-Hit Math

### Mechanics

Multi-Hit is a chance for attacks to hit additional times. Each multi-hit uses the base attack damage.

```
multiHitChance = sum of all multiHitChance sources (pure-percentage)
multiHitDamage = sum of all multiHitDamage sources (pure-percentage, bonus on multi-hits)
```

### DPS Multiplier from Multi-Hit

```
multiHitDPSMultiplier = 1 + (multiHitChance / 100) * (1 + multiHitDamage / 100)
```

### Source Inventory

| Source | Type | Value |
|--------|------|-------|
| HQ Multi-Hit | upgrade | +2% per level, max +20% |
| Michelangelo Inspiration 2 | inspiration | +5 / +10 / +15% |
| +10% Multi-Hit chance mastery | mastery (Mikey) | +10% |
| Torrential Strike | power (conditional) | +8/10/12% per Torrent stack, max 5 |
| Cascade Drive | power (legendary, conditional) | +3% per Charge activation (room) |

| Source | Type | Value |
|--------|------|-------|
| +40% Multi-Hit damage mastery | mastery (Mikey) | +40% |

### Multi-Hit Synergy Powers

These powers don't directly grant multi-hit chance but significantly enhance multi-hit value:

- **When It Rains**: Multi-hits deal +30/45/60 flat Water damage per extra hit. Not tracked as a stat bonus, but dramatically increases the effective value of each multi-hit proc.
- **Torrential Rain**: Generates Torrent stacks via Special/Tool use (not just Final Strike). Enables Torrential Strike's multi-hit bonus from more activation sources, increasing uptime.

### Worked Example: Michelangelo Multi-Hit Build

```
HQ Multi-Hit Lv10: +20%
Mikey Inspiration 2 Lv3: +15%
Mastery "+10% Multi-Hit chance": +10%
TOTAL multiHitChance = 45%

Mastery "+40% Multi-Hit damage": +40%
TOTAL multiHitDamage = 40%

DPS multiplier = 1 + (45/100) * (1 + 40/100) = 1 + 0.45 * 1.4 = 1 + 0.63 = 1.63

This means 63% more average damage output from Multi-Hit alone.

With Torrential Strike Lv3 at max stacks (5 * 12% = +60% conditional):
  conditional multiHitChance = 45 + 60 = 105%
  DPS multiplier = 1 + (105/100) * 1.4 = 1 + 1.47 = 2.47
  (147% more damage -- effectively every hit multi-hits with bonus damage)
```
