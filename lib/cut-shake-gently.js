function cutShakeGently(array, random = Math.random) {
  if (!Array.isArray(array)) {
    throw new TypeError('cutShakeGently expects an array');
  }
  if (typeof random !== 'function') {
    throw new TypeError('cutShakeGently expects a random function');
  }

  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

module.exports = cutShakeGently;
