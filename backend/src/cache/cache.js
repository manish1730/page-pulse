const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: Number(process.env.CACHE_TTL),
  checkperiod: 60,
});

module.exports = cache;