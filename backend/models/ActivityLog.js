const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  action: String, // e.g. "save", "share", "report"
  targetId: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);
