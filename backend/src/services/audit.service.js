const axios = require("axios");
const cheerio = require("cheerio");

const auditUrl = async (url) => {

  const start = Date.now();

  const response = await axios.get(url);

  const responseTime = Date.now() - start;

  const $ = cheerio.load(response.data);

  return {

    url,

    status: response.status,

    responseTime: `${responseTime} ms`,

    title: $("title").text(),

  };

};

module.exports = {
  auditUrl,
};