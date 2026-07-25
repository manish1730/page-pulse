const rateLimit = require("express-rate-limit");

const auditLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    error: "RATE_LIMIT_EXCEEDED",
    message: "Too many requests. Please try again later.",
  },
});

module.exports = auditLimiter;