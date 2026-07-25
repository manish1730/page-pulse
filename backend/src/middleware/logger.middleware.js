const { v4: uuidv4 } = require("uuid");
const logger = require("../logger/logger");

const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Generate a unique request ID
  req.requestId = uuidv4();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info({
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration} ms`,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });
  });

  next();
};

module.exports = requestLogger;