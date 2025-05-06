const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const activities = await ActivityLog.find({ userId: user._id })
      .sort({ date: -1 })
      .limit(10);
    res.json({
      credits: user.credits,
      savedFeeds: user.savedFeeds,
      activities,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to load dashboard", error: err.message });
  }
};
