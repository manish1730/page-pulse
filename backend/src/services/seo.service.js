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

  return {
    title,
    metaDescription,
    canonical,
    robotsMeta,
    h1Count,
    h2Count,
  };
};

module.exports = {
  extractSEOData,
};