/**
 * @typedef Particle
 * @property {number} x
 * @property {number} y
 * @property {number} age
 * @property {number} weight
 * @property {number} intensity
 */

const settings = Object.freeze({
  radiusMax: 30,
  radiusMin: 20,
  // Drawing settings
  dotHue: `194`
});

/**
 * Creates a particle
 * @param {import("./script").State} state
 * @returns {Particle}
 * 
 */
export function create(state) {
  const { pointer, pointerDown } = state;
  return {
    ...pointer,
    weight: Math.random(),
    age: 1,
    // If pointer is down 50% intensity, otherwise 1%
    // Would be nicer to use an envelope here so it ramps up and down.
    intensity: pointerDown ? 0.5 : 0.01
  };
}

/**
 * Each point is drawn as a circle
 * @param {CanvasRenderingContext2D} context 
 * @param {Particle} pt 
 * @param {import("./script").State} state
 */
export const draw = (context, pt, state) => {
  const { radiusMax, radiusMin, dotHue } = settings;
  const { width, height } = state.bounds;

  // Calculate radius based on relative 
  // random radius, max radius & age of particle
  const radius = (radiusMax - radiusMin) * (pt.weight * pt.age) + (radiusMin* pt.age);

  // Calculate colour for dot, with age determining the opacity
  const fillStyle = `hsla(${dotHue}, 60%, ${Math.floor(pt.intensity*100)}%, ${pt.age})`;

  // Translate so 0,0 is the middle
  context.save();
  context.translate(pt.x*width, pt.y*height);

  // Fill a circle
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fillStyle = fillStyle;
  context.fill();

  // Unwind translation
  context.restore();
};

/**
 * @typedef Point
 * @property {number} x
 * @property {number} y
 */