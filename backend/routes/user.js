const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  getDashboard,
  getCurrentUser,
} = require("../controllers/userController");

router.get("/dashboard", authenticate, getDashboard);
router.get("/me", authenticate, getCurrentUser); // ✅ Add this

module.exports = router;
