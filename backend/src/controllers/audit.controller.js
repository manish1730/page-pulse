const { auditUrl } = require("../services/audit.service");

const auditWebsite = async (req, res) => {
  try {
    const { url } = req.body;

    const result = await auditUrl(url);

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  auditWebsite,
};