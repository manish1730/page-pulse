const axios = require("axios");
const { parseStringPromise } = require("xml2js");

const extractRobotsData = async (baseUrl) => {
  const robotsUrl = `${baseUrl.replace(/\/$/, "")}/robots.txt`;

  let robotsExists = false;
  let sitemapExists = false;
  let sitemapDeclared = false;

  let sitemapType = null;
  let sitemapUrls = 0;
  let sitemaps = 0;

  const issues = [];
  const recommendations = [];

  try {
    const robotsResponse = await axios.get(robotsUrl, {
      timeout: 5000,
    });

    robotsExists = true;

    const lines = robotsResponse.data.split("\n");

    const sitemapLines = lines.filter((line) =>
      line.toLowerCase().startsWith("sitemap:")
    );

    if (sitemapLines.length > 0) {
      sitemapDeclared = true;

      for (const line of sitemapLines) {
        const sitemapUrl = line.replace(/sitemap:/i, "").trim();

        try {
          const sitemapResponse = await axios.get(sitemapUrl, {
            timeout: 5000,
          });

          sitemapExists = true;

          const parsed = await parseStringPromise(sitemapResponse.data);

          if (parsed.urlset?.url) {
            sitemapType = "urlset";
            sitemapUrls += parsed.urlset.url.length;
          }

          else if (parsed.sitemapindex?.sitemap) {
            sitemapType = "index";
            sitemaps += parsed.sitemapindex.sitemap.length;
          }

        } catch (_) {}
      }
    }
  } catch (_) {
    issues.push({
      type: "missing-file",
      file: "robots.txt",
      severity: "medium",
      recommendation: "Create a robots.txt file.",
    });
  }

  if (robotsExists && !sitemapDeclared) {
    issues.push({
      type: "missing-sitemap-reference",
      severity: "low",
      recommendation: "Declare your sitemap in robots.txt.",
    });
  }

  if (!sitemapExists) {
    issues.push({
      type: "missing-file",
      file: "sitemap.xml",
      severity: "medium",
      recommendation: "Provide a sitemap for search engines.",
    });
  }

  let score = 100;

  if (!robotsExists) score -= 20;
  if (!sitemapExists) score -= 20;
  if (robotsExists && !sitemapDeclared) score -= 10;

  score = Math.max(score, 0);

  if (!robotsExists) {
    recommendations.push("Create a robots.txt file.");
  }

  if (!sitemapExists) {
    recommendations.push("Expose a sitemap for search engines.");
  }

  if (robotsExists && !sitemapDeclared) {
    recommendations.push("Reference your sitemap inside robots.txt.");
  }

  return {
    score,

 metrics: {
  robotsExists,
  sitemapExists,
  sitemapDeclared,
  sitemapType,
  childSitemaps: sitemaps,
  urlCount: sitemapUrls,
},

    issues,

    recommendations,
  };
};

module.exports = {
  extractRobotsData,
};