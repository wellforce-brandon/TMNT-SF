// TMNT: Splintered Fate - Shared Formatting & Card Utilities
// Effect text resolvers and upgrade card component used across all tabs

/**
 * Resolve effect text for a specific level.
 * Replaces "10% / 12.5% / 15%" (or any N slash-separated values) with the
 * single value at position (level - 1), wrapped in a highlighted <span>.
 * Supports 2–6+ values for artifacts with many levels.
 */
export function resolveEffectForLevel(text, level) {
  if (!level || level < 1) return text;
  return text.replace(
    /[+-]?\d+(?:\.\d+)?[%s]?(?:\s*\/\s*[+-]?\d+(?:\.\d+)?[%s]?)+/g,
    (match) => {
      const vals = match.split(/\s*\/\s*/);
      const idx = Math.min(level - 1, vals.length - 1);
      return `<span class="effect-value">${vals[idx]}</span>`;
    }
  );
}

/**
 * Shared upgrade card HTML generator.
 * Returns an HTML string — event binding is done by each tab after innerHTML is set.
 *
 * @param {Object} opts
 * @param {string}  opts.name           — Card title
 * @param {string}  opts.effect         — Effect text with "X / Y / Z" patterns
 * @param {number}  opts.level          — Current level (1-based), 0 if not selected
 * @param {number}  opts.maxLevel       — Max level (e.g. 3, 6)
 * @param {boolean} opts.isInBuild      — Whether the card is selected/equipped/active
 * @param {boolean} [opts.alwaysShowControls] — Always show edge zones & level buttons (permanent upgrades)
 * @param {string}  [opts.extraClasses] — Additional CSS classes (e.g. 'available-highlight locked')
 * @param {string}  opts.dataAttr       — Data attribute string (e.g. 'data-power="Splash"')
 * @param {string}  [opts.typeAttr]     — Type attribute (e.g. 'data-type="water"')
 * @param {string}  [opts.badges]       — HTML for card-meta badges
 * @param {string}  [opts.prereqHtml]   — HTML for prerequisite section
 * @param {string}  [opts.headerExtra]  — HTML for extra header badges (Equipped, Starting)
 */
export function renderUpgradeCard({
  name,
  effect,
  level,
  maxLevel,
  isInBuild,
  alwaysShowControls = false,
  extraClasses = '',
  dataAttr,
  typeAttr = '',
  badges = '',
  prereqHtml = '',
  headerExtra = '',
}) {
  const showControls = isInBuild || alwaysShowControls;

  let classes = 'card';
  if (showControls) classes += ' upgrade-card';
  if (isInBuild) classes += ' in-build';
  if (extraClasses) classes += ' ' + extraClasses;

  // Edge zones (± buttons on left/right)
  const edgeZones = showControls ? `
    <div class="card-edge-zone card-edge-dec" ${dataAttr.replace('data-', 'data-dec-')}>&minus;</div>
    <div class="card-edge-zone card-edge-inc" ${dataAttr.replace('data-', 'data-inc-')}${maxLevel ? ` data-max="${maxLevel}"` : ''}>+</div>
  ` : '';

  // Resolved effect text
  const effectHtml = showControls && level > 0
    ? resolveEffectForLevel(effect, level)
    : effect;

  // Level selector buttons (numbered 1..maxLevel)
  let levelButtons = '';
  if (showControls && maxLevel > 1) {
    const btns = [];
    for (let i = 1; i <= maxLevel; i++) {
      btns.push(`<button class="level-btn ${level === i ? 'active' : ''}" data-level="${i}">${i}</button>`);
    }
    levelButtons = `<div class="level-selector" ${dataAttr.replace('data-', 'data-level-')}>${btns.join('')}</div>`;
  }

  return `
    <div class="${classes}" ${typeAttr} ${dataAttr}>
      ${edgeZones}
      <div class="card-header">
        <span class="card-name">${name}</span>
        ${headerExtra}
      </div>
      <div class="card-effect">${effectHtml}</div>
      ${prereqHtml}
      ${badges ? `<div class="card-meta">${badges}</div>` : ''}
      ${levelButtons}
    </div>
  `;
}
