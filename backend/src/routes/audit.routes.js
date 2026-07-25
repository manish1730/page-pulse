const express = require("express");
const router = express.Router();

const { auditWebsite } = require("../controllers/audit.controller");
const validate = require("../middleware/validate.middleware");
const auditSchema = require("../validators/audit.validator");

router.post("/audit",validate(auditSchema), auditWebsite);

module.exports = router;