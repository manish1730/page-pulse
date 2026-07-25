const { z } = require("zod");

const auditSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
});

module.exports = auditSchema;