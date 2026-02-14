# DPS Estimation & Conditional Bonus Evaluation

> Back to [Math Reference Index](MATH.md)

---

## Effective DPS Estimation

### Framework

```
--- Attack DPS ---
baseAttackDPS = finalAttack * attacksPerSecond
critMultiplier = 1 + (critChance/100) * (critDamage/100)
multiHitMultiplier = 1 + (multiHitChance/100) * (1 + multiHitDamage/100)
effectiveAttackDPS = baseAttackDPS * critMultiplier * multiHitMultiplier

--- Dash DPS ---
dashBurstDamage = finalDash * dashCharges
dashDPS = dashBurstDamage / dashCooldownWindow

--- Special DPS ---
specialBurstDamage = finalSpecial
specialCritMult = 1 + (specialCritChance/100) * (critDamage/100)
specialDPS = specialBurstDamage * specialCritMult / specialChargeTime

--- Tool DPS ---
toolBurstDamage = toolBaseDamage * (1 + toolDamage/100)
toolDPS = toolBurstDamage / toolChargeTime

--- Elemental DoT DPS ---
dotDPS = sum of all active DoT ticks per second * (1 + elementalDamage/100)

--- Total Estimated DPS ---
totalDPS = effectiveAttackDPS + dashDPS + specialDPS + toolDPS + dotDPS
```

### Caveats

The following values are NOT tracked in the data and must be estimated or assumed:
- `attacksPerSecond`: varies by character, attack combo chain, and animation speed. Typical estimate: 1.5-2.5 hits/sec.
- `dashCooldownWindow`: time between dash charge refreshes
- `specialChargeTime`: base charge time modified by `specialChargeRate`
- `toolChargeTime`: base charge time modified by `toolChargeRate`
- Movement overhead and positioning time

### Comparative DPS Example

```
Raphael Crit Build (permanent bonuses only):
  finalAttack = 62 (at HQ Atk Lv16)
  critChance = 99%, critDamage = 289%
  critMultiplier = 1 + 0.99 * 2.89 = 3.86
  multiHitChance = 0%, multiHitMultiplier = 1.0

  At 2.0 attacks/sec: DPS = 62 * 2.0 * 3.86 = 478.6

Michelangelo Multi-Hit Build (permanent bonuses only):
  finalAttack = Math.round(18 * (1 + 160/100)) = 47 (at HQ Atk Lv16)
  critChance = 20% (HQ only), critDamage = 50% (HQ only)
  critMultiplier = 1 + 0.20 * 0.50 = 1.10
  multiHitChance = 45%, multiHitDamage = 40%
  multiHitMultiplier = 1 + 0.45 * 1.40 = 1.63

  At 2.0 attacks/sec: DPS = 47 * 2.0 * 1.10 * 1.63 = 168.6

Raphael's crit build dramatically outperforms Mikey's multi-hit build on raw attack DPS.
But Mikey has elemental damage, AoE, and utility that raw numbers don't capture.
```

### Multi-Hit DPS Interactions

The `multiHitMultiplier` in the formula above captures the base multi-hit DPS contribution, but two powers add further value that isn't reflected in the multiplier alone:

1. **When It Rains** adds +30/45/60 flat Water damage per multi-hit proc. This is additive elemental damage on top of each extra hit, making each multi-hit proc worth significantly more than just a repeat of the base attack.

2. **Torrent stack chain** (Torrential Strike + Torrential Rain) sustains higher multi-hit uptime. Torrential Rain generates Torrent stacks from Special/Tool use (not just Final Strike), giving Torrential Strike's conditional multi-hit bonus more consistent uptime across different combat patterns.

3. **Cascade Drive** (legendary) adds +3% multi-hit chance per Charge activation for the room. In extended encounters, this can stack to significant levels, making it a ramping multi-hit source that complements the flat sources.

---

## Conditional Bonus Evaluation Guide

Conditional bonuses are tracked separately from permanent bonuses. They are NOT included in the stat engine's main values. An LLM evaluating a build should consider their uptime.

### Uptime Classification

**High Uptime (~80-100% of combat time)**
| Bonus | Condition | Effective Value |
|-------|-----------|-----------------|
| Rapid Fire `attackDamage` + `moveSpeed` | Timed buff (25-45s) | Active for most/all of a room |
| Dark Embrace per-power scaling | Per Dark power owned | Always active, scales with build |
| Techno-Organic Interface `moveSpeed` | Permanent (mislabeled?) | Always active |

**Medium Uptime (~30-60% of combat time)**
| Bonus | Condition | Effective Value |
|-------|-----------|-----------------|
| First Strike `attackDamage` +30-60% | 1s after Dash | Active during dash-attack rhythm |
| Ninjutsu Tactics `critChance` +15-25% | On Dodge, 2-3s | Depends on enemy attack frequency + dodge% |
| The Juice `attackDamage` + `moveSpeed` | Timed buff (4-6s) | Active after tool use, short window |
| Mikey mastery `attackDamage` + `moveSpeed` +20% | 3s on kill | High uptime in mob rooms, low vs bosses |

**Low Uptime (~5-20% of combat time)**
| Bonus | Condition | Effective Value |
|-------|-----------|-----------------|
| Torrential Strike `multiHitChance` | Per Torrent stack (max 5) | Ramps up during attack combo, resets |
| Smoke Bomb `dodgeChance` +20-40% | While in cloud | Only during tool area, 2-4s |
| Revved Up `dodgeChance` +20-30% | vs Blinding Light enemies | Only enemies YOU blinded |
| High Tide `moveSpeed` +15% | While Still Waters active | Only while not attacking (2s+ gap) |
| Raph mastery `critDamage` +3% per kill | Stacking per kill | Grows through encounter, resets between |

### LLM Decision Framework

When evaluating a build, calculate TWO numbers:

1. **Floor** (permanent bonuses only): The guaranteed minimum output
2. **Ceiling** (all conditionals at max): The theoretical maximum

For a **realistic estimate**: Include Floor + High-uptime conditionals + 50% of Medium-uptime conditionals.

```
realisticStat = permanentTotal + sum(highUptimeConditionals) + 0.5 * sum(mediumUptimeConditionals)
```
