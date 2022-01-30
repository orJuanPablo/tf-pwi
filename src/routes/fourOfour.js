const { Router } = require("express");
const router = Router();

const { fourOfour } = require("../controllers/fourOfour");
router.get("/", fourOfour);
module.exports = router;
