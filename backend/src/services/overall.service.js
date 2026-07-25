const calculateOverallScore = (results) => {
  const scores = [
    results.seo.score,
    results.images.score,
    results.links.score,
    results.security.score,
    results.robots.score,
    results.performance.score,
  ];

  const score = Math.round(
    scores.reduce((sum, value) => sum + value, 0) / scores.length
  );

  let grade = "F";
  let status = "Poor";

  if (score >= 97) {
    grade = "A+";
    status = "Outstanding";
  } else if (score >= 90) {
    grade = "A";
    status = "Excellent";
  } else if (score >= 80) {
    grade = "B";
    status = "Good";
  } else if (score >= 70) {
    grade = "C";
    status = "Average";
  } else if (score >= 60) {
    grade = "D";
    status = "Needs Improvement";
  }


// Collect all issues
const allIssues = [
  ...results.seo.issues,
  ...results.images.issues,
  ...results.links.issues,
  ...results.security.issues,
  ...results.robots.issues,
  ...results.performance.issues,
];

const highIssues = allIssues.filter(
  (issue) => issue.severity === "high"
).length;

const mediumIssues = allIssues.filter(
  (issue) => issue.severity === "medium"
).length;

const lowIssues = allIssues.filter(
  (issue) => issue.severity === "low"
).length;

// Build a smarter summary
const strengths = [];

if (results.seo.score >= 95) strengths.push("SEO");
if (results.security.score >= 95) strengths.push("security");
if (results.performance.score >= 95) strengths.push("performance");
if (results.images.score >= 95) strengths.push("image accessibility");
if (results.links.score >= 95) strengths.push("link structure");
if (results.robots.score >= 95) strengths.push("crawlability");

let summary = `${status} website with an overall health score of ${score}/100.`;

if (strengths.length > 0) {
  summary += ` Strong ${strengths.join(", ")} practices were detected.`;
}

if (highIssues > 0) {
  summary += ` ${highIssues} high-priority issue${highIssues > 1 ? "s require" : " requires"} attention.`;
} else if (mediumIssues > 0) {
  summary += ` ${mediumIssues} medium-priority improvement${mediumIssues > 1 ? "s are" : " is"} recommended.`;
} else if (lowIssues > 0) {
  summary += ` Only ${lowIssues} minor improvement${lowIssues > 1 ? "s are" : " is"} recommended.`;
} else {
  summary += " No significant issues were detected.";
}

return {
  score,
  grade,
  status,
  summary,

  issueSummary: {
    high: highIssues,
    medium: mediumIssues,
    low: lowIssues,
    total: allIssues.length,
  },
};
};

module.exports = {
  calculateOverallScore,
};