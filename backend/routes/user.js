const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  getDashboard,
  getCurrentUser,
  awardCredits,
} = require("../controllers/userController");

router.get("/dashboard", authenticate, getDashboard);
router.get("/me", authenticate, getCurrentUser);
router.post("/award", authenticate, awardCredits);

module.exports = router;
