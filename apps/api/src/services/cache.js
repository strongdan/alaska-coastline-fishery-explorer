const cache = new Map();
const TTL = 1000 * 60 * 60; // 1 hour

module.exports = {
  get: (key) => {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
      cache.delete(key);
      return null;
    }
    return entry.value;
  },
  set: (key, value) => {
    cache.set(key, {
      value,
      expires: Date.now() + TTL
    });
  }
};
