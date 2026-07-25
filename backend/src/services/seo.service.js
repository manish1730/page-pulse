const extractSEOData = ($) => {
  const title = $("title").text().trim();

  const metaDescription =
    $('meta[name="description"]').attr("content") || "";

  const canonical =
    $('link[rel="canonical"]').attr("href") || "";

  const robotsMeta =
    $('meta[name="robots"]').attr("content") || "";

  const h1Count = $("h1").length;
  const h2Count = $("h2").length;

  let score = 100;

  const issues = [];
  const recommendations = [];

  if (!title) {
    score -= 20;

    issues.push({
      type: "missing-title",
      severity: "high",
      recommendation: "Add a descriptive title tag."
    });
  }

  if (!metaDescription) {
    score -= 15;

    issues.push({
      type: "missing-meta-description",
      severity: "medium",
      recommendation: "Add a meta description."
    });
  }

  if (!canonical) {
    score -= 10;

    issues.push({
      type: "missing-canonical",
      severity: "low",
      recommendation: "Add a canonical URL."
    });
  }

  if (h1Count === 0) {
    score -= 10;

    issues.push({
      type: "missing-h1",
      severity: "medium",
      recommendation: "Include at least one H1 heading."
    });
  }

  if (h1Count > 1) {
    score -= 5;

    issues.push({
      type: "multiple-h1",
      severity: "low",
      recommendation: "Use a single H1 heading."
    });
  }

  issues.forEach(issue => {
    recommendations.push(issue.recommendation);
  });

  return {
    score,

    metrics: {
      title,
      metaDescription,
      canonical,
      robotsMeta,
      h1Count,
      h2Count,
    },

    issues,

    recommendations,
  };
};

module.exports = {
  extractSEOData,
};