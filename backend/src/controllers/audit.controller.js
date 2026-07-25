const { auditUrl } = require("../services/audit.service");

const auditWebsite = async (req, res, next) => {
  try {
    const { url } = req.body;

    const result = await auditUrl(url);

    return res.status(200).json({
      success: true,
      requestId: req.requestId,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auditWebsite,
};