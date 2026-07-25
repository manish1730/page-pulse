const express = require("express");
const router = express.Router();

const { auditWebsite } = require("../controllers/audit.controller");

router.post("/audit", auditWebsite);

module.exports = router;