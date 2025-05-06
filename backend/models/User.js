const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  credits: { type: Number, default: 0 },
  savedFeeds: [String],
  reportedFeeds: [String],
  lastLogin: Date,

  // 🆕 Add activity log for tracking actions
  activities: [
    {
      action: String,
      date: Date,
    },
  ],

  // 🆕 Track if user completed their profile (optional)
  profileCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
