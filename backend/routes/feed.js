const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const {
  getFeed,
  savePost,
  sharePost,
  reportPost,
} = require("../controllers/feedController");

router.get("/", authenticate, getFeed);
router.post("/save/:id", authenticate, savePost);
router.post("/share/:id", authenticate, sharePost);
router.post("/report/:id", authenticate, reportPost);

module.exports = router;
