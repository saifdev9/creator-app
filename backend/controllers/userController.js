const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const today = new Date().toDateString();
    const lastLogin = user.lastLogin
      ? new Date(user.lastLogin).toDateString()
      : null;

    // 👇 If the user hasn't logged in today, give +5 credits
    if (today !== lastLogin) {
      // Update user credits
      user.credits += 5;
      user.lastLogin = new Date(); // Update the lastLogin timestamp
      await user.save();

      // Log the activity in ActivityLog
      const activity = new ActivityLog({
        userId: user._id,
        action: "Daily login +5",
        date: new Date(),
      });
      await activity.save();
    }

    // Fetch the latest 10 activities from the ActivityLog
    const activities = await ActivityLog.find({ userId: user._id })
      .sort({ date: -1 })
      .limit(10);

    // Send the dashboard data response
    res.json({
      credits: user.credits,
      savedFeeds: user.savedFeeds,
      activities, // return activities as well
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to load dashboard", error: err.message });
  }
};

// Get current user details
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: err.message });
  }
};

exports.awardCredits = async (req, res) => {
  const { action } = req.body; // "profile_complete" or "feed_interaction"
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    let creditAmount = 0;
    let actionDescription = "";

    switch (action) {
      case "profile_complete":
        if (!user.profileCompleted) {
          user.credits += 10;
          user.profileCompleted = true; // add this field in model
          creditAmount = 10;
          actionDescription = "Profile completed +10";
        } else {
          return res.status(400).json({ message: "Profile already completed" });
        }
        break;
      case "feed_interaction":
        user.credits += 2;
        creditAmount = 2;
        actionDescription = "Feed interaction +2";
        break;
      default:
        return res.status(400).json({ message: "Invalid action" });
    }

    await user.save();

    await ActivityLog.create({
      userId,
      action: actionDescription,
      date: new Date(),
    });

    res.json({ credits: user.credits, message: actionDescription });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Credit awarding failed", error: err.message });
  }
};

exports.adminUpdateCredits = async (req, res) => {
  const { userId, credits } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.credits = credits;
    await user.save();

    await ActivityLog.create({
      userId,
      action: `Admin set credits to ${credits}`,
      date: new Date(),
    });

    res.json({ message: "Credits updated", credits: user.credits });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
