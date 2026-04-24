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
    return entry;
  },
  set: (key, value) => {
    const now = Date.now();
    const expires = now + TTL;
    cache.set(key, {
      value,
      cachedAt: now,
      expires: expires
    });
    return expires;
  }
};
