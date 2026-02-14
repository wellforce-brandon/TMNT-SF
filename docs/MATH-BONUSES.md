# Bonus Sources

> Back to [Math Reference Index](MATH.md)

All bonuses come from 6 source types. They are all additive with each other.

---

## HQ Dragon Upgrades (Combat)

17 upgrades that affect the stat engine:

| Upgrade | Stat Key | Per Level | Max Lv | Max Effect |
|---------|----------|-----------|--------|------------|
| Attack Damage | `attackDamage` | +10% | 16 | +160% |
| Special Damage | `specialAttack` | +10% | 17 | +170% |
| Fast Attacks | `dashAttackDamage` | +10% | 10 | +100% |
| Health | `maxHealth` | +10% | 25 | +250% |
| Critical Chance | `critChance` | +2% | 10 | +20% |
| Critical Damage | `critDamage` | +5% | 10 | +50% |
| Multi-Hit | `multiHitChance` | +2% | 10 | +20% |
| Fast Abilities | `specialChargeRate` | +5% | 10 | +50% |
| Mechanical Genius | `toolChargeRate` | +10% | 5 | +50% |
| Tool Damage | `toolDamage` | +15% | 10 | +150% |
| Focused Forces | `elementalDamage` | +7.5% | 10 | +75% |
| Enduring Effects | `negativeEffectDuration` | +10% | 5 | +50% |
| Stronger Stuff | `negativeEffectDamage` | +5% | 5 | +25% |
| Hammertime | `dodgeChance` | +4% | 5 | +20% |
| Swiftness | `moveSpeed` | +5% | 10 | +50% |
| Savor the Flavor | `healEffectiveness` | +20% | 5 | +100% |
| Dash Charge | `dashCharges` | flat | 3 | +3 |
| Splinter's Revive | `revives` | flat | 3 | +3 |

6 Dragon upgrades with `stat: null` (not tracked by stat engine): Astral Rejuvenation, Confidence, Pizza Entree, Reliable Allies, Slice of Life.

17 Dreamer upgrades are all economy/meta upgrades with `stat: null` -- none affect combat stats.

---

## Powers with statBonuses

| Power | Type | Tier | Stat(s) | Lv1 / Lv2 / Lv3 | Conditional? |
|-------|------|------|---------|------------------|-------------|
| Furious Attacks | flame | initial | `critChance` | 20 / 35 / 50 | No |
| Precision | flame | secondary | `critDamage` | 60 / 120 / 180 | No |
| Rapid Fire | flame | initial | `attackDamage` | 20 / 35 / 50 | Yes: timed buff |
| Rapid Fire | flame | initial | `moveSpeed` | 25 / 40 / 55 | Yes: timed buff |
| Torrential Strike | water | initial | `multiHitChance` | 8 / 10 / 12 | Yes: per Torrent stack (max 5) |
| High Tide | water | secondary | `moveSpeed` | 15 (flat) | Yes: while Still Waters active |
| Techno-Organic Interface | utrom | secondary | `maxHealth` | 10 / 20 / 30 | No |
| Techno-Organic Interface | utrom | secondary | `moveSpeed` | 15 (flat) | No |
| First Strike | ninja | initial | `attackDamage` | 30 / 45 / 60 | Yes: 1s after Dash |
| Quick Feet | ninja | initial | `dashCharges` | +1 (flat) | No |
| Shinobi Supremacy | ninja | initial | `dodgeChance` | 10 / 15 / 20 | No |
| Ninjutsu Tactics | ninja | secondary | `critChance` | 15 / 25 / 25 | Yes: on Dodge, 2-3s |
| Light Attacks | light | initial | `attackDamage` | 4 / 7 / 10 | Yes: % of Max Health |
| Revival | light | secondary | `revives` | +1 (flat) | No |
| Revival | light | secondary | `maxHealthFlat` | 30 / 60 | No |
| Revved Up | light | secondary | `dodgeChance` | 20 / 25 / 30 | Yes: vs Blinding Light enemies |
| Dark Embrace | dark | secondary | `attackDamage` | 3 / 4 / 5 | Yes: per Dark power owned |
| Dark Embrace | dark | secondary | `moveSpeed` | 5 / 7 / 10 | Yes: per Dark power owned |
| Eternal Darkness | dark | secondary | `negativeEffectDuration` | 50 / 80 / 100 | No |
| Spare Bot | robotics | initial | `revives` | +1 (flat) | No |

---

## Masteries with statBonuses

Masteries have no level scaling (always treated as level 1). Multiple characters share certain masteries.

| Mastery Name | Character(s) | Stat | Value | Cond? |
|-------------|-------------|------|-------|-------|
| +10% Elemental damage | Mikey | `elementalDamage` | 10 | No |
| +10% Multi-Hit chance | Mikey | `multiHitChance` | 10 | No |
| +40% Multi-Hit damage | Mikey | `multiHitDamage` | 40 | No |
| +15% Attack area/damage | Mikey, Casey | `attackDamage` | 15 | No |
| +15% all damage dealt | Donnie | `attackDamage` | 15 | No |
| +20% Damage dealt + Move Speed 3s on kill | Mikey | `attackDamage` | 20 | Yes: 3s on kill |
| +20% Damage dealt + Move Speed 3s on kill | Mikey | `moveSpeed` | 20 | Yes: 3s on kill |
| +30% Dash Attack damage... | Mikey, Leo, Raph, Donnie, Casey, Metal | `dashAttackDamage` | 30 | No |
| +30% Special area, charges 20% faster | Mikey | `specialChargeRate` | 20 | No |
| Special charges 30% faster | Leo, Casey | `specialChargeRate` | 30 | No |
| Tool charges 30% faster | Donnie | `toolChargeRate` | 30 | No |
| +20% Attack Critical Hit chance | Raph, Metal | `critChance` | 20 | No |
| +20% Special Critical Hit chance | Raph, Casey | `specialCritChance` | 20 | No |
| +3% Crit damage per kill | Raph | `critDamage` | 3 | Yes: per kill |
| +50% Critical Hit damage | Raph | `critDamage` | 50 | No |
| +30% Special damage | Raph | `specialAttack` | 30 | No |
| +75% Special damage | Donnie | `specialAttack` | 75 | No |
| +50% move speed during Special | Metal | `moveSpeed` | 50 | Yes: during Special |

---

## Inspirations with statBonuses

| Inspiration | Character | Stat(s) | Lv1 / Lv2 / Lv3 | Max Lv |
|------------|-----------|---------|------------------|--------|
| Michelangelo Inspiration 1 | Mikey | `attackDamage` | 5 / 10 / 15 | 3 |
| Michelangelo Inspiration 2 | Mikey | `multiHitChance` | 5 / 10 / 15 | 3 |
| Raphael Inspiration 1 | Raph | `specialCritChance` | 5 / 10 / 15 | 3 |
| Raphael Inspiration 2 | Raph | `critChance` | 3 / 6 / 9 | 3 |
| Raphael Inspiration 2 | Raph | `critDamage` | 3 / 6 / 9 | 3 |
| Donatello Inspiration 2 | Donnie | `toolChargeRate` | 20 / 40 | 2 |

**Inspirations without stat engine data** (effect-text-only):
- Leonardo Insp 1: +5/10/15 Master Strike damage
- Leonardo Insp 2: +1/2 Special charges
- Donatello Insp 1: Restore 1/2/3 Health on encounter start
- Casey Jones Insp 1: Special applies Guard Break +1/2/3s
- Casey Jones Insp 2: Next attack as Final Strike with +33/66/100% Crit Chance
- Metalhead Insp 1: Boss defeat upgrade + 25/50/75 Scrap
- Metalhead Insp 2: Tool applies Guard Break 3/6/9s

---

## Tools with statBonuses

| Tool | Stat(s) | Lv1 / Lv2 / Lv3 | Conditional? |
|------|---------|------------------|-------------|
| Smoke Bomb | `dodgeChance` | 20 / 30 / 40 | Yes: while in cloud |
| The Juice | `attackDamage` | 15 / 25 / 35 | Yes: timed buff (4/5/6s) |
| The Juice | `moveSpeed` | 10 / 15 / 20 | Yes: timed buff (4/5/6s) |

All other 16 tools have no `statBonuses` -- their damage is effect-text-only.

---

## Artifacts with statBonuses

| Artifact | Stat | Lv1 / Lv2 / Lv3 / Lv4 / Lv5 / Lv6 | Conditional? |
|----------|------|--------------------------------------|-------------|
| Heart of Tengu | `dodgeChance` | 5 / 7.5 / 10 / 12.5 / 15 / 17.5 | No |
| Clan Hamato Seal | `revives` | +1 (flat, all levels) | No |

All other 22 artifacts have no `statBonuses` -- their effects are economy/meta/effect-text-only.
