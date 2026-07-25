const axios = require("axios");
const cheerio = require("cheerio");
const AppError = require("../utils/AppError");

const auditUrl = async (url) => {
  try {
    const start = Date.now();

    const response = await axios.get(url, {
      timeout: Number(process.env.REQUEST_TIMEOUT),
    });

    const responseTime = Date.now() - start;

    const $ = cheerio.load(response.data);

    return {
      url,
      status: response.status,
      responseTime: `${responseTime} ms`,
      title: $("title").text(),
    };
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new AppError(
        "Website took too long to respond.",
        408,
        "REQUEST_TIMEOUT"
      );
    }

    if (error.code === "ENOTFOUND") {
      throw new AppError(
        "Website could not be reached.",
        404,
        "HOST_NOT_FOUND"
      );
    }

    throw new AppError(
      "Failed to audit website.",
      500,
      "AUDIT_FAILED"
    );
  }
};

module.exports = {
  auditUrl,
};