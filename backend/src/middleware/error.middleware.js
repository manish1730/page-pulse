const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: err.errorCode || "INTERNAL_ERROR",
    message: err.message || "Something went wrong",
  });
};

module.exports = errorHandler;