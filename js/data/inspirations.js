// TMNT: Splintered Fate - Inspirations Data
// 2 per character, each with 3 scaling levels

export const inspirations = [
  // =====================
  // MICHELANGELO
  // =====================
  {
    character: 'michelangelo',
    name: 'Party Spirit',
    levels: [
      { level: 1, effect: '+10% attack speed after using a Special for 4 seconds.' },
      { level: 2, effect: '+20% attack speed after using a Special for 5 seconds.' },
      { level: 3, effect: '+30% attack speed after using a Special for 6 seconds. Specials also release a shockwave dealing 50% attack damage.' }
    ]
  },
  {
    character: 'michelangelo',
    name: 'Shell Surfer',
    levels: [
      { level: 1, effect: '+15% move speed while dashing. Dash cooldown reduced by 10%.' },
      { level: 2, effect: '+25% move speed while dashing. Dash cooldown reduced by 20%.' },
      { level: 3, effect: '+35% move speed while dashing. Dash cooldown reduced by 30%. Dashing through enemies applies 1 Ooze stack.' }
    ]
  },

  // =====================
  // LEONARDO
  // =====================
  {
    character: 'leonardo',
    name: 'Way of the Blade',
    levels: [
      { level: 1, effect: '+10% critical hit chance on all attacks.' },
      { level: 2, effect: '+15% critical hit chance on all attacks. Critical hits deal 20% bonus damage.' },
      { level: 3, effect: '+20% critical hit chance on all attacks. Critical hits deal 35% bonus damage and restore 3% max HP.' }
    ]
  },
  {
    character: 'leonardo',
    name: 'Commander\'s Resolve',
    levels: [
      { level: 1, effect: '+10% damage and +5% damage reduction during boss encounters.' },
      { level: 2, effect: '+15% damage and +10% damage reduction during boss encounters.' },
      { level: 3, effect: '+20% damage and +15% damage reduction during boss encounters. Boss phase transitions restore 10% max HP.' }
    ]
  },

  // =====================
  // RAPHAEL
  // =====================
  {
    character: 'raphael',
    name: 'Unbridled Fury',
    levels: [
      { level: 1, effect: '+10% attack damage when below 50% HP.' },
      { level: 2, effect: '+20% attack damage when below 50% HP. +5% lifesteal on attacks.' },
      { level: 3, effect: '+30% attack damage when below 50% HP. +10% lifesteal on attacks. Taking lethal damage triggers a burst dealing 200% attack damage to all nearby enemies (once per room).' }
    ]
  },
  {
    character: 'raphael',
    name: 'Sai Storm',
    levels: [
      { level: 1, effect: 'Every 6th hit throws a sai projectile dealing 75% attack damage.' },
      { level: 2, effect: 'Every 5th hit throws a sai projectile dealing 100% attack damage.' },
      { level: 3, effect: 'Every 4th hit throws two sai projectiles dealing 100% attack damage each. Sai projectiles apply Flame on hit.' }
    ]
  },

  // =====================
  // DONATELLO
  // =====================
  {
    character: 'donatello',
    name: 'Inventor\'s Brilliance',
    levels: [
      { level: 1, effect: 'Tools charge 15% faster.' },
      { level: 2, effect: 'Tools charge 25% faster. Tool effects last 20% longer.' },
      { level: 3, effect: 'Tools charge 35% faster. Tool effects last 30% longer. Using a tool grants +15% special damage for 5 seconds.' }
    ]
  },
  {
    character: 'donatello',
    name: 'Ooze Synthesis',
    levels: [
      { level: 1, effect: '+15% Ooze damage. Ooze effects last 1 second longer.' },
      { level: 2, effect: '+25% Ooze damage. Ooze effects last 2 seconds longer. Ooze stacks apply 10% faster.' },
      { level: 3, effect: '+40% Ooze damage. Ooze effects last 3 seconds longer. Enemies at max Ooze stacks take 20% more damage from all sources.' }
    ]
  },

  // =====================
  // CASEY
  // =====================
  {
    character: 'casey',
    name: 'Vigilante Justice',
    levels: [
      { level: 1, effect: '+10% damage. Defeating enemies grants a 3-second speed boost.' },
      { level: 2, effect: '+15% damage. Defeating enemies grants a 5-second speed and damage boost.' },
      { level: 3, effect: '+20% damage. Defeating enemies grants a 5-second speed and damage boost. Every 10th defeat fully restores The Juice cooldown.' }
    ]
  },
  {
    character: 'casey',
    name: 'All or Nothing',
    levels: [
      { level: 1, effect: '+15% critical hit damage. -5% max HP.' },
      { level: 2, effect: '+30% critical hit damage. -5% max HP. +10% critical hit chance.' },
      { level: 3, effect: '+50% critical hit damage. -5% max HP. +15% critical hit chance. Critical hits have a 20% chance to reset dash cooldown.' }
    ]
  },

  // =====================
  // METALHEAD
  // =====================
  {
    character: 'metalhead',
    name: 'Combat Protocol',
    levels: [
      { level: 1, effect: '+10% attack damage. Special attacks stun enemies for 0.5 seconds.' },
      { level: 2, effect: '+15% attack damage. Special attacks stun enemies for 1 second.' },
      { level: 3, effect: '+20% attack damage. Special attacks stun enemies for 1.5 seconds. Stunned enemies take 25% more damage.' }
    ]
  },
  {
    character: 'metalhead',
    name: 'Adaptive Plating',
    levels: [
      { level: 1, effect: '+10% damage reduction. Regenerate 0.5% max HP every 5 seconds.' },
      { level: 2, effect: '+15% damage reduction. Regenerate 1% max HP every 5 seconds.' },
      { level: 3, effect: '+20% damage reduction. Regenerate 1.5% max HP every 5 seconds. At full HP, excess healing converts to a barrier (up to 15% max HP).' }
    ]
  }
];
