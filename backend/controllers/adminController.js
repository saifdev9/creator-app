const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");

exports.getUserStats = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const logs = await ActivityLog.find();
    res.json({ users, logs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch admin data", error: err.message });
  }
};

exports.updateCredits = async (req, res) => {
  try {
    const { id } = req.params;
    const { credits } = req.body;
    const user = await User.findByIdAndUpdate(id, { credits }, { new: true });
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update credits", error: err.message });
  }
};
