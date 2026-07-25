const extractPerformanceData = ($, response, responseTime) => {
  const html = response.data;

  const htmlSizeKB = Number(
    (Buffer.byteLength(html, "utf8") / 1024).toFixed(2)
  );

  const jsFiles = $("script[src]").length;
  const cssFiles = $('link[rel="stylesheet"]').length;
  const images = $("img").length;

 const encoding = response.headers["content-encoding"];

let compressionEnabled = null;

if (encoding) {
  compressionEnabled =
    encoding.includes("gzip") ||
    encoding.includes("br");
};

  const issues = [];
  const recommendations = [];

  let score = 100;

  // Response Time
  if (responseTime > 2000) {
    score -= 20;

    issues.push({
      type: "slow-response",
      severity: "high",
      value: `${responseTime} ms`,
      recommendation: "Reduce server response time."
    });
  }

  // HTML Size
  if (htmlSizeKB > 300) {
    score -= 10;

    issues.push({
      type: "large-html",
      severity: "medium",
      value: `${htmlSizeKB} KB`,
      recommendation: "Reduce HTML document size."
    });
  }

  // JS Files
  if (jsFiles > 20) {
    score -= 10;

    issues.push({
      type: "too-many-js-files",
      severity: "medium",
      value: jsFiles,
      recommendation: "Bundle or reduce JavaScript files."
    });
  }

  // CSS Files
  if (cssFiles > 25) {
    score -= 5;

    issues.push({
        type: "too-many-css-files",
        severity: "low",
        value: cssFiles,
        recommendation: "Reduce CSS requests."
    });
}

  // Compression
  // Compression
if (compressionEnabled === false) {
  score -= 15;

  issues.push({
    type: "compression-disabled",
    severity: "high",
    recommendation: "Enable Gzip or Brotli compression."
  });
}
  score = Math.max(score, 0);

  if (responseTime > 2000) {
    recommendations.push("Improve backend response time.");
  }

  if (htmlSizeKB > 300) {
    recommendations.push("Minify or reduce HTML output.");
  }

  if (jsFiles > 20) {
    recommendations.push("Bundle JavaScript assets.");
  }

  if (cssFiles > 25) {
    recommendations.push("Combine or minify CSS.");
  }

 if (compressionEnabled === false) {
  recommendations.push("Enable Gzip or Brotli compression.");
}

  return {
    score,

    metrics: {
    responseTime: `${responseTime} ms`,
    htmlSizeKB,
    jsFiles,
    cssFiles,
    images,
    compression: {
    encoding: encoding || "Unknown",
    enabled: compressionEnabled,
  },
},

    issues,

    recommendations,
  };
};

module.exports = {
  extractPerformanceData,
};