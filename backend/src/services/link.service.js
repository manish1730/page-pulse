const extractLinkData = ($, baseUrl) => {
  const anchors = $("a");

  let internal = 0;
  let external = 0;
  let empty = 0;
  let anchorLinks = 0;
  let javascriptLinks = 0;

  const issues = [];

  const baseHost = new URL(baseUrl).hostname;

  anchors.each((_, element) => {
    const href = ($(element).attr("href") || "").trim();

    if (!href) {
      empty++;

      issues.push({
        type: "empty-link",
        severity: "medium",
        href: "",
        recommendation: "Provide a valid href attribute."
      });

      return;
    }

    if (href.startsWith("#")) {
      anchorLinks++;
      return;
    }

    if (href.startsWith("javascript:")) {
      javascriptLinks++;

      issues.push({
        type: "javascript-link",
        severity: "low",
        href,
        recommendation:
          "Avoid javascript: links. Use buttons or proper URLs."
      });

      return;
    }

    if (
      href.startsWith("http://") ||
      href.startsWith("https://")
    ) {
      const host = new URL(href).hostname;

      if (host === baseHost) {
        internal++;
      } else {
        external++;
      }
    } else {
      internal++;
    }
  });

  const total = anchors.length;

  let score = 100;

  score -= empty * 5;
  score -= javascriptLinks * 3;

  score = Math.max(score, 0);

  const recommendations = [];

  if (empty > 0) {
    recommendations.push(
      "Replace empty links with valid destinations."
    );
  }

  if (javascriptLinks > 0) {
    recommendations.push(
      "Avoid using javascript: URLs for navigation."
    );
  }

  return {
    score,

    metrics: {
      total,
      internal,
      external,
      anchorLinks,
      javascriptLinks,
      empty,
    },

    issues,

    recommendations,
  };
};

module.exports = {
  extractLinkData,
};