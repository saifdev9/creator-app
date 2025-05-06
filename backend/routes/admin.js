const express = require("express");
const router = express.Router();
const { authenticate, adminOnly } = require("../middleware/authMiddleware");
const {
  getUserStats,
  updateCredits,
} = require("../controllers/adminController");

router.get("/users", authenticate, adminOnly, getUserStats);
router.patch("/users/:id/credit", authenticate, adminOnly, updateCredits);

module.exports = router;
