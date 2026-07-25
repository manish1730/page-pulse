const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    requestId: req.requestId,
    error: err.errorCode || "INTERNAL_ERROR",
    message: err.message || "Something went wrong",
  });
};

module.exports = errorHandler;