const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const auditRoutes = require("./routes/audit.routes.js");
const errorHandler = require("./middleware/error.middleware");
const requestLogger = require("./middleware/logger.middleware");

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(requestLogger);
app.use("/api/v1", auditRoutes);
app.use(errorHandler);


app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PagePulse API is running 🚀",
  });
});

module.exports = app;