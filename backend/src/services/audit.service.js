const axios = require("axios");
const cheerio = require("cheerio");
const AppError = require("../utils/AppError");
const cache = require("../cache/cache");
const { extractSEOData } = require("./seo.service");
const { extractImageData } = require("./image.service");
const { extractLinkData } = require("./link.service");
const { extractSecurityData } = require("./security.service");
const { extractRobotsData } = require("./robots.service");
const { extractPerformanceData } = require("./performance.service");
const { calculateOverallScore } = require("./overall.service");

const auditUrl = async (url) => {
  try {
    const start = Date.now();

    const cachedResult = cache.get(url);

   if (cachedResult) {
     return {
      ...cachedResult,
      cached: true,
    };
    }

   const response = await axios.get(url, {
  timeout: Number(process.env.REQUEST_TIMEOUT),
});

const responseTime = Date.now() - start;

const $ = cheerio.load(response.data);

const seo = extractSEOData($);
const images = extractImageData($);
const links = extractLinkData($, url);
const security = extractSecurityData(response.headers, url);
const robots = await extractRobotsData(url);
const performance = extractPerformanceData(
  $,
  response,
  responseTime
);
const overall = calculateOverallScore({
  seo,
  images,
  links,
  security,
  robots,
  performance,
});
const result = {
  url,
  status: response.status,
  responseTime: `${responseTime} ms`,
  overall,
  seo,
  images,
  links,
  security,
  robots,
  performance,
};

cache.set(url, result);

return {
  ...result,
  cached: false,
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