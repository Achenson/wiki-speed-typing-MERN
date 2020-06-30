const Redis = require("ioredis");

module.exports = () => {
  const redis = new Redis();
  return redis;
}