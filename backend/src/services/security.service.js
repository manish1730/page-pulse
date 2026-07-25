const extractSecurityData = (headers, url) => {
  const issues = [];
  const recommendations = [];

  const metrics = {
    https: url.startsWith("https://"),
    hsts: Boolean(headers["strict-transport-security"]),
    contentSecurityPolicy: Boolean(headers["content-security-policy"]),
    xFrameOptions: Boolean(headers["x-frame-options"]),
    xContentTypeOptions: Boolean(headers["x-content-type-options"]),
    referrerPolicy: Boolean(headers["referrer-policy"]),
    permissionsPolicy: Boolean(headers["permissions-policy"]),
  };

  let score = 100;

  if (!metrics.https) {
    score -= 20;
    issues.push({
      type: "https",
      severity: "high",
      recommendation: "Serve the website over HTTPS."
    });
  }

  if (!metrics.hsts) {
    score -= 10;
    issues.push({
      type: "missing-header",
      header: "Strict-Transport-Security",
      severity: "medium",
      recommendation: "Add the Strict-Transport-Security header."
    });
  }

  if (!metrics.contentSecurityPolicy) {
    score -= 15;
    issues.push({
      type: "missing-header",
      header: "Content-Security-Policy",
      severity: "high",
      recommendation: "Add a Content-Security-Policy header."
    });
  }

  if (!metrics.xFrameOptions) {
    score -= 10;
    issues.push({
      type: "missing-header",
      header: "X-Frame-Options",
      severity: "medium",
      recommendation: "Add the X-Frame-Options header."
    });
  }

  if (!metrics.xContentTypeOptions) {
    score -= 10;
    issues.push({
      type: "missing-header",
      header: "X-Content-Type-Options",
      severity: "medium",
      recommendation: "Add the X-Content-Type-Options header."
    });
  }

  if (!metrics.referrerPolicy) {
    score -= 5;
    issues.push({
      type: "missing-header",
      header: "Referrer-Policy",
      severity: "low",
      recommendation: "Add the Referrer-Policy header."
    });
  }

  if (!metrics.permissionsPolicy) {
    score -= 5;
    issues.push({
      type: "missing-header",
      header: "Permissions-Policy",
      severity: "low",
      recommendation: "Add the Permissions-Policy header."
    });
  }

  score = Math.max(score, 0);

  if (!metrics.hsts) {
    recommendations.push("Enable HTTP Strict Transport Security (HSTS).");
  }

  if (!metrics.contentSecurityPolicy) {
    recommendations.push("Configure a Content Security Policy (CSP).");
  }

  if (!metrics.xFrameOptions) {
    recommendations.push("Protect against clickjacking with X-Frame-Options.");
  }

  if (!metrics.xContentTypeOptions) {
    recommendations.push("Set X-Content-Type-Options to 'nosniff'.");
  }

  if (!metrics.referrerPolicy) {
    recommendations.push("Define a Referrer-Policy header.");
  }

  if (!metrics.permissionsPolicy) {
    recommendations.push("Restrict browser features using Permissions-Policy.");
  }

  return {
    score,
    metrics,
    issues,
    recommendations,
  };
};

module.exports = {
  extractSecurityData,
};