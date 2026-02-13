// TMNT: Splintered Fate - Masteries Data
// ~85 character-specific masteries that provide passive upgrades

export const masteries = [
  // =====================
  // MICHELANGELO - Speed, utility, party-themed buffs
  // =====================
  {
    character: 'michelangelo',
    name: 'Party Time',
    effect: '+20% attack speed for 5 seconds after using a Special.',
    tags: ['special', 'speed']
  },
  {
    character: 'michelangelo',
    name: 'Cowabunga Rush',
    effect: '+25% move speed after dashing for 3 seconds.',
    tags: ['dash', 'speed']
  },
  {
    character: 'michelangelo',
    name: 'Pizza Power',
    effect: 'Healing pickups restore 15% more health.',
    tags: ['health', 'general']
  },
  {
    character: 'michelangelo',
    name: 'Nunchaku Frenzy',
    effect: 'Every 5th consecutive hit deals double damage.',
    tags: ['attack', 'crit']
  },
  {
    character: 'michelangelo',
    name: 'Slippery Shell',
    effect: '+30% chance to dodge attacks while dashing.',
    tags: ['dash', 'defense']
  },
  {
    character: 'michelangelo',
    name: 'Ooze Spin',
    effect: 'Dash attacks apply 1 stack of Ooze on hit.',
    tags: ['dash', 'ooze', 'attack']
  },
  {
    character: 'michelangelo',
    name: 'Light on Your Feet',
    effect: '+15% move speed while at full health.',
    tags: ['speed', 'health']
  },
  {
    character: 'michelangelo',
    name: 'Water Slide',
    effect: '+35% Water damage dealt by tools.',
    tags: ['water', 'attack']
  },
  {
    character: 'michelangelo',
    name: 'Crowd Surfer',
    effect: 'Gain +10% damage for each enemy within close range (max 30%).',
    tags: ['attack', 'general']
  },
  {
    character: 'michelangelo',
    name: 'Afterimage',
    effect: 'Dashing leaves a shadow that deals 20% of your attack damage to nearby enemies.',
    tags: ['dash', 'attack']
  },
  {
    character: 'michelangelo',
    name: 'Flame Juggle',
    effect: '+25% Flame damage on dash attacks.',
    tags: ['flame', 'dash', 'attack']
  },
  {
    character: 'michelangelo',
    name: 'Taunt Mastery',
    effect: 'Taunted enemies take 15% more damage from all sources.',
    tags: ['special', 'attack']
  },
  {
    character: 'michelangelo',
    name: 'Second Wind',
    effect: 'Taking lethal damage instead heals 20% HP once per run.',
    tags: ['health', 'defense']
  },
  {
    character: 'michelangelo',
    name: 'Rapid Recovery',
    effect: 'Dash cooldown reduced by 20%.',
    tags: ['dash', 'speed']
  },

  // =====================
  // LEONARDO - Precision, leadership, balanced combat
  // =====================
  {
    character: 'leonardo',
    name: 'Blade Precision',
    effect: '+15% critical hit chance on attacks.',
    tags: ['crit', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Shuriken Mastery',
    effect: 'Shuriken bounce 2 additional times.',
    tags: ['shuriken', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Leadership Aura',
    effect: '+10% damage dealt while at 75% HP or above.',
    tags: ['attack', 'health']
  },
  {
    character: 'leonardo',
    name: 'Water Blade',
    effect: '+30% Water damage on all attacks.',
    tags: ['water', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Defensive Stance',
    effect: '+20% damage reduction when standing still.',
    tags: ['defense', 'general']
  },
  {
    character: 'leonardo',
    name: 'Light Strike',
    effect: 'Attacks have a 20% chance to apply a Light debuff, reducing enemy speed.',
    tags: ['light', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Focused Mind',
    effect: 'Special charge rate increased by 20%.',
    tags: ['special', 'general']
  },
  {
    character: 'leonardo',
    name: 'Counter Slash',
    effect: 'After dodging an attack, your next hit deals 40% bonus damage.',
    tags: ['dash', 'crit', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Boss Slayer',
    effect: '+25% damage dealt to Bosses.',
    tags: ['boss', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Dual Katana Flow',
    effect: 'Consecutive attacks on the same target deal 5% stacking damage (max 25%).',
    tags: ['attack', 'general']
  },
  {
    character: 'leonardo',
    name: 'Ninja Discipline',
    effect: '+10% damage and +10% damage reduction during boss fights.',
    tags: ['boss', 'attack', 'defense']
  },
  {
    character: 'leonardo',
    name: 'Astral Edge',
    effect: '+20% Astral damage on special attacks.',
    tags: ['astral', 'special', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Barrier Cut',
    effect: 'Attacks deal 30% more damage to enemy barriers.',
    tags: ['barrier', 'attack']
  },
  {
    character: 'leonardo',
    name: 'Calm Before the Storm',
    effect: 'Not attacking for 2 seconds grants +35% damage on your next hit.',
    tags: ['attack', 'crit']
  },
  {
    character: 'leonardo',
    name: 'Utrom Resonance',
    effect: '+20% Utrom damage from all sources.',
    tags: ['utrom', 'attack']
  },

  // =====================
  // RAPHAEL - Raw damage, aggression, berserker-style
  // =====================
  {
    character: 'raphael',
    name: 'Seeing Red',
    effect: '+20% attack damage when below 50% HP.',
    tags: ['attack', 'health']
  },
  {
    character: 'raphael',
    name: 'Flame Sai',
    effect: '+30% Flame damage on all attacks.',
    tags: ['flame', 'attack']
  },
  {
    character: 'raphael',
    name: 'Berserker Rage',
    effect: '+3% attack damage for each hit in a combo (resets after 2 seconds).',
    tags: ['attack', 'speed']
  },
  {
    character: 'raphael',
    name: 'Thick Skin',
    effect: '+15% damage reduction from all sources.',
    tags: ['defense', 'general']
  },
  {
    character: 'raphael',
    name: 'Armor Breaker',
    effect: 'Attacks ignore 25% of enemy defense.',
    tags: ['attack', 'barrier']
  },
  {
    character: 'raphael',
    name: 'Blood Fury',
    effect: 'Critical hits heal for 5% of damage dealt.',
    tags: ['crit', 'health']
  },
  {
    character: 'raphael',
    name: 'Ooze Infusion',
    effect: 'Attacks apply 1 Ooze stack every 4th hit.',
    tags: ['ooze', 'attack']
  },
  {
    character: 'raphael',
    name: 'Unstoppable',
    effect: 'Cannot be knocked back while attacking.',
    tags: ['attack', 'defense']
  },
  {
    character: 'raphael',
    name: 'Dark Fury',
    effect: '+25% Dark damage on special attacks.',
    tags: ['dark', 'special', 'attack']
  },
  {
    character: 'raphael',
    name: 'Sai Throw',
    effect: 'Dash attacks throw a sai forward dealing 150% dash attack damage.',
    tags: ['dash', 'attack']
  },
  {
    character: 'raphael',
    name: 'Reckless Charge',
    effect: 'Dashing into enemies deals damage equal to 50% of your attack damage.',
    tags: ['dash', 'attack']
  },
  {
    character: 'raphael',
    name: 'Boss Brawler',
    effect: '+20% damage reduction from Boss attacks.',
    tags: ['boss', 'defense']
  },
  {
    character: 'raphael',
    name: 'Finishing Blow',
    effect: 'Deal +40% damage to enemies below 25% HP.',
    tags: ['attack', 'crit']
  },
  {
    character: 'raphael',
    name: 'Turtle Line Pull',
    effect: 'Turtle Line pulls deal 20% more damage and stun for 1 second.',
    tags: ['tool', 'attack']
  },
  {
    character: 'raphael',
    name: 'Relentless',
    effect: '+10% attack speed. Stacks an additional +5% each time you take damage (max 25%).',
    tags: ['speed', 'attack']
  },

  // =====================
  // DONATELLO - Tech, specials, tools, support
  // =====================
  {
    character: 'donatello',
    name: 'Overcharged Specials',
    effect: '+25% special attack damage.',
    tags: ['special', 'attack']
  },
  {
    character: 'donatello',
    name: 'Tech Upgrade',
    effect: 'Tools charge 20% faster.',
    tags: ['tool', 'speed']
  },
  {
    character: 'donatello',
    name: 'Ooze Expertise',
    effect: '+35% Ooze damage from all sources.',
    tags: ['ooze', 'attack']
  },
  {
    character: 'donatello',
    name: 'Bo Staff Reach',
    effect: 'Attack range increased by 15%.',
    tags: ['attack', 'general']
  },
  {
    character: 'donatello',
    name: 'Shield Matrix',
    effect: 'Barriers absorb 25% more damage before breaking.',
    tags: ['barrier', 'defense']
  },
  {
    character: 'donatello',
    name: 'Utrom Analysis',
    effect: '+30% Utrom damage on all attacks.',
    tags: ['utrom', 'attack']
  },
  {
    character: 'donatello',
    name: 'Robotics Expert',
    effect: 'Attack Drone and Utrom Drone deal 30% more damage.',
    tags: ['robotics', 'tool', 'attack']
  },
  {
    character: 'donatello',
    name: 'Hardened Shell Upgrade',
    effect: 'Hardened Shell lasts 30% longer and reflects 10% of blocked damage.',
    tags: ['tool', 'defense']
  },
  {
    character: 'donatello',
    name: 'Calculated Strike',
    effect: '+20% critical hit chance on special attacks.',
    tags: ['special', 'crit']
  },
  {
    character: 'donatello',
    name: 'Field Medic',
    effect: 'Healing pickups also grant a 5-second 10% damage reduction buff.',
    tags: ['health', 'defense']
  },
  {
    character: 'donatello',
    name: 'Light Emitter',
    effect: 'Special attacks apply a Light debuff, slowing enemies by 20% for 3 seconds.',
    tags: ['light', 'special']
  },
  {
    character: 'donatello',
    name: 'Chain Reaction',
    effect: 'Enemies defeated by specials explode, dealing 30% of their max HP to nearby enemies.',
    tags: ['special', 'attack']
  },
  {
    character: 'donatello',
    name: 'Astral Resonator',
    effect: '+25% Astral damage. Astral effects last 2 seconds longer.',
    tags: ['astral', 'attack']
  },
  {
    character: 'donatello',
    name: 'Tactical Retreat',
    effect: 'Dashing grants a 1-second shield absorbing up to 15% of max HP in damage.',
    tags: ['dash', 'defense']
  },

  // =====================
  // CASEY - Physical combat, brutal damage, risk/reward
  // =====================
  {
    character: 'casey',
    name: 'Batter Up',
    effect: '+20% attack damage with a 10% chance to send enemies flying.',
    tags: ['attack', 'general']
  },
  {
    character: 'casey',
    name: 'Adrenaline Rush',
    effect: '+15% move speed and +10% damage for 5 seconds after defeating an enemy.',
    tags: ['speed', 'attack']
  },
  {
    character: 'casey',
    name: 'Juiced Up',
    effect: 'The Juice tool grants an additional 10% damage bonus and lasts 3 seconds longer.',
    tags: ['tool', 'attack']
  },
  {
    character: 'casey',
    name: 'Hockey Mask Grit',
    effect: '+25% damage reduction when below 30% HP.',
    tags: ['defense', 'health']
  },
  {
    character: 'casey',
    name: 'Home Run',
    effect: 'Critical hits deal 50% bonus damage (instead of the normal bonus).',
    tags: ['crit', 'attack']
  },
  {
    character: 'casey',
    name: 'Street Fighter',
    effect: '+15% damage dealt in rooms with 5 or more enemies.',
    tags: ['attack', 'general']
  },
  {
    character: 'casey',
    name: 'Flame Bat',
    effect: 'Every 3rd attack applies Flame, igniting enemies for 4 seconds.',
    tags: ['flame', 'attack']
  },
  {
    character: 'casey',
    name: 'Risk Taker',
    effect: '+30% attack damage but incoming damage increased by 10%.',
    tags: ['attack', 'general']
  },
  {
    character: 'casey',
    name: 'Cheap Shot',
    effect: '+40% damage to stunned or slowed enemies.',
    tags: ['attack', 'crit']
  },
  {
    character: 'casey',
    name: 'Pain Train',
    effect: 'Dashing through enemies deals damage and reduces their speed by 20% for 2 seconds.',
    tags: ['dash', 'attack', 'speed']
  },
  {
    character: 'casey',
    name: 'Boss Hunter',
    effect: '+20% damage to Bosses. Bosses drop 25% more health pickups.',
    tags: ['boss', 'attack', 'health']
  },
  {
    character: 'casey',
    name: 'Dark Edge',
    effect: '+25% Dark damage on attacks and dash attacks.',
    tags: ['dark', 'attack', 'dash']
  },
  {
    character: 'casey',
    name: 'Shattered Defense',
    effect: 'Consecutive hits on the same target reduce its defense by 5% (max 25%).',
    tags: ['attack', 'barrier']
  },
  {
    character: 'casey',
    name: 'Last Stand',
    effect: 'When below 20% HP, attack speed doubles but healing is reduced by 50%.',
    tags: ['attack', 'speed', 'health']
  },

  // =====================
  // METALHEAD - Robotics, durability, heavy hits
  // =====================
  {
    character: 'metalhead',
    name: 'Heavy Plating',
    effect: '+20% damage reduction from all sources.',
    tags: ['defense', 'general']
  },
  {
    character: 'metalhead',
    name: 'Overclocked Servos',
    effect: '+15% attack damage and +10% attack speed.',
    tags: ['attack', 'speed']
  },
  {
    character: 'metalhead',
    name: 'Landmine Upgrade',
    effect: 'Landmines deal 30% more damage and deploy 1 second faster.',
    tags: ['tool', 'attack']
  },
  {
    character: 'metalhead',
    name: 'Utrom Core',
    effect: '+35% Utrom damage on all attacks.',
    tags: ['utrom', 'attack']
  },
  {
    character: 'metalhead',
    name: 'Shock Absorbers',
    effect: '+25% damage reduction from Boss attacks.',
    tags: ['boss', 'defense']
  },
  {
    character: 'metalhead',
    name: 'Rocket Dash',
    effect: 'Dash distance increased by 30%. Dashing leaves a fire trail dealing Flame damage.',
    tags: ['dash', 'flame', 'attack']
  },
  {
    character: 'metalhead',
    name: 'Self-Repair',
    effect: 'Regenerate 1% max HP every 5 seconds.',
    tags: ['health', 'robotics']
  },
  {
    character: 'metalhead',
    name: 'Robotics Network',
    effect: 'Drones deal 25% more damage and last 5 seconds longer.',
    tags: ['robotics', 'tool', 'attack']
  },
  {
    character: 'metalhead',
    name: 'Concussive Blast',
    effect: 'Special attacks stun enemies for 1.5 seconds.',
    tags: ['special', 'attack']
  },
  {
    character: 'metalhead',
    name: 'Titanium Fist',
    effect: '+20% critical hit chance. Critical hits knock enemies back.',
    tags: ['crit', 'attack']
  },
  {
    character: 'metalhead',
    name: 'Energy Shield',
    effect: 'Gain a barrier that absorbs 20% max HP in damage. Regenerates after 15 seconds without taking damage.',
    tags: ['barrier', 'defense', 'robotics']
  },
  {
    character: 'metalhead',
    name: 'Dark Voltage',
    effect: '+25% Dark damage on all attacks. Dark hits have a 10% chance to short-circuit enemies.',
    tags: ['dark', 'attack']
  },
  {
    character: 'metalhead',
    name: 'Fortress Mode',
    effect: '+30% damage reduction and +15% attack damage while standing still.',
    tags: ['defense', 'attack']
  },
  {
    character: 'metalhead',
    name: 'System Purge',
    effect: 'Using a special clears all debuffs and grants 2 seconds of invulnerability.',
    tags: ['special', 'defense', 'robotics']
  },
  {
    character: 'metalhead',
    name: 'Astral Conduit',
    effect: '+20% Astral damage. Special attacks chain Astral energy to 2 nearby enemies.',
    tags: ['astral', 'special', 'attack']
  }
];
