const extractImageData = ($) => {
  const imgElements = $("img");
  const svgElements = $("svg");
  const pictureElements = $("picture");

  let missingAlt = 0;
  let lazyLoaded = 0;
  let accessibleImages = 0;

  const issues = [];

  imgElements.each((_, image) => {
    const img = $(image);

    const alt = img.attr("alt");
    const src = img.attr("src") || "Unknown Source";

    if (!alt || alt.trim() === "") {
      missingAlt++;

      issues.push({
        type: "missing-alt",
        severity: "medium",
        src,
        recommendation: "Add a descriptive alt attribute.",
      });
    } else {
      accessibleImages++;
    }

    if (img.attr("loading") === "lazy") {
      lazyLoaded++;
    }
  });

  const accessibilityScore =
    imgElements.length === 0
      ? 100
      : Math.round((accessibleImages / imgElements.length) * 100);

  let score = accessibilityScore;

  if (lazyLoaded === 0 && imgElements.length > 3) {
    score -= 10;
  }

  score = Math.max(score, 0);

  const recommendations = [];

  if (missingAlt > 0) {
    recommendations.push(
      "Add descriptive alt text to all informative images."
    );
  }

  if (lazyLoaded === 0 && imgElements.length > 3) {
    recommendations.push(
      "Enable lazy loading for below-the-fold images."
    );
  }

  return {
    score,

    metrics: {
      imgTags: imgElements.length,
      svgElements: svgElements.length,
      pictureElements: pictureElements.length,
      lazyLoaded,
      accessibleImages,
      missingAlt,
      accessibilityScore: `${accessibilityScore}%`,
    },

    issues,

    recommendations,
  };
};

module.exports = {
  extractImageData,
};