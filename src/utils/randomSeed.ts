// Simple seeded pseudo-random number generator (LCG)
function seededRandom(seed: number) {
  let state = seed;
  return function () {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

// --- Start of new implementation ---

// We'''ll cache the generator and the seed it was created with.
let cachedRandomNumber: number | null = null;
let cachedSeed: number | null = null;

function getDailySeed() {
  const today = new Date();
  return (
    today.getUTCFullYear() * 10000 + // YYYY0000
    (today.getUTCMonth() + 1) * 100 +
    today.getUTCDate()
  ); // MM00 + DD
}

export function random() {
  const seed = getDailySeed();
  // If the day has changed or we don'''t have a number, generate a new one.
  if (seed !== cachedSeed || cachedRandomNumber === null) {
    cachedSeed = seed;
    const generator = seededRandom(seed);
    cachedRandomNumber = generator(); // Generate the number once and cache it
  }
  return cachedRandomNumber;
}
// --- End of new implementation ---

export function getDaysSinceStart() {
  const startDate = new Date("2025-01-01T00:00:00Z");
  const today = new Date();
  return Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
}