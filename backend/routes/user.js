const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const { getDashboard } = require("../controllers/userController");

router.get("/dashboard", authenticate, getDashboard);

module.exports = router;
