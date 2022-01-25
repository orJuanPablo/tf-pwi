const { Router } = require("express");
const router = Router();

const { home } = require("../controllers/home");
router.get("/", (req, res) => {
  home;
});
module.exports = router;