# Health, Survivability & Elemental/DoT Calculations

> Back to [Math Reference Index](MATH.md)

---

## Health & Survivability

### Health Calculation

Health uses the capped percentage formula (see [Core Formulas](MATH.md#4-core-formulas)):

```
maxHealthPct = HQ_bonus('maxHealth') + build_permanent_bonuses('maxHealth')
maxHealthFlat = build_permanent_bonuses('maxHealthFlat')

health = Math.min(
  Math.round(character.health * (1 + maxHealthPct / 100)) + maxHealthFlat,
  character.maxHealth
)
```

Health is always capped at `character.maxHealth`.

### Effective Health (Dodge)

Dodge chance represents the probability of avoiding damage entirely.

```
effectiveHP = health / (1 - dodgeChance / 100)    (for dodgeChance < 100)
```

### Dodge Source Inventory

| Source | Type | Value | Conditional? |
|--------|------|-------|-------------|
| HQ Hammertime | upgrade | +4% per level, max +20% | No |
| Shinobi Supremacy | power | +10 / +15 / +20% | No |
| Heart of Tengu | artifact | +5 to +17.5% (6 levels) | No |
| Ninjutsu Tactics | power | +15 / +25 / +25% critChance (NOT dodge) | N/A |
| Revved Up | power | +20 / +25 / +30% | Yes: vs Blinding Light enemies |
| Smoke Bomb | tool | +20 / +30 / +40% | Yes: while in cloud |

### Maximum Permanent Dodge

```
HQ Hammertime Lv5: +20%
Shinobi Supremacy Lv3: +20%
Heart of Tengu Lv6: +17.5%
TOTAL permanent dodge = 57.5%

effectiveHP at 57.5% dodge with 420 HP (Raphael maxed):
  420 / (1 - 0.575) = 420 / 0.425 = 988 effective HP
```

### Heal Effectiveness

```
actualHeal = baseHeal * (1 + healEffectiveness / 100)
```

HQ Savor the Flavor maxed: +100% = heals are doubled.

### Revives

Each Splinter's Revive restores 25% of max health (base). Modified by:
- Astral Rejuvenation HQ upgrade: +10 per level (up to +30 additional health on revive)
- Clan Hamato Seal artifact: +10/15/20% additional health on revive
- Astral Charm artifact: +3 to +5.5s invulnerability on revive

Maximum revives from stat engine: HQ (3) + Revival (1) + Spare Bot (1) + Clan Hamato Seal (1) = 6 revives.

---

## Elemental & DoT Calculations

### Global Modifiers

Two stats affect ALL elemental/DoT effects:
- `elementalDamage`: percentage bonus to all elemental damage
- `negativeEffectDuration`: percentage bonus to all negative effect durations
- `negativeEffectDamage`: percentage bonus to all negative effect tick damage

### Ooze System

| Mechanic | Base Value | Modifiers |
|----------|-----------|-----------|
| Max stacks | 5 | Chunky Mixture: raised to 6/8/10 |
| Stack duration | 5 seconds | `negativeEffectDuration` extends |
| Damage per stack/sec | ~1 | `negativeEffectDamage` + `elementalDamage` |
| Application amount | 1 stack per source | Potency: +1/2/3 stacks per application |

**Ooze Damage Powers:**
- Goo: +60/120/180% Ooze damage per second
- Catalytic Consequence: +15/25/35 damage per Ooze stack on Dash Attack
- Goo'dbye: 50/100/150 explosion damage on Oozed enemy death
- Unfortunate Odor: 10/45/80 Ooze damage + 1s stun

```
Example: Full Ooze Build
  Chunky Mixture Lv3: max 10 stacks
  Potency Lv3: +3 stacks per application (4 total per source)
  Goo Lv3: +180% Ooze damage/sec
  HQ Focused Forces Lv10: +75% elementalDamage
  HQ Enduring Effect Lv5: +50% negativeEffectDuration

  Ooze duration: 5 * (1 + 50/100) = 7.5 seconds per stack
  Ooze DPS at 10 stacks: 10 * baseDmg * (1 + 180/100) * (1 + 75/100)
```

### Inferno (Flame DoT)

| Mechanic | Base Value | Modifiers |
|----------|-----------|-----------|
| Damage per second | 15/20/25 (by level) | `elementalDamage`, `negativeEffectDamage` |
| Duration | 3 seconds | Blazing Inferno: +3/4/5s. `negativeEffectDuration` |

### Electrified (Utrom DoT)

| Mechanic | Base Value | Modifiers |
|----------|-----------|-----------|
| Damage per second | 10/15/20 (by level) | `elementalDamage`, `negativeEffectDamage` |
| Max stacks | 3 | Fixed |
| Damage amp (Alt. Current) | +30/50/70% damage received | Separate multiplier |

**Alternating Current** is special: it makes Electrified enemies take MORE damage from ALL sources, not just Utrom. This is a multiplicative damage amp.

### Darkness DoT

| Mechanic | Base Value | Modifiers |
|----------|-----------|-----------|
| Lingering Darkness DPS | 10/15/25 (by level) | `elementalDamage`, `negativeEffectDamage` |
| Duration extension | N/A | Eternal Darkness: +50/80/100% `negativeEffectDuration` |
