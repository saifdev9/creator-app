const FeedItem = require("../models/FeedItem");
const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");
const axios = require("axios");

exports.getFeed = async (req, res) => {
  try {
    const redditRes = await axios.get("https://www.reddit.com/r/popular.json");
    const redditPosts = redditRes.data.data.children.map((post) => ({
      source: "reddit",
      content: post.data.title,
      link: "https://reddit.com" + post.data.permalink,
      postedAt: new Date(post.data.created_utc * 1000),
    }));

    const mockPosts = [
      {
        source: "linkedin",
        content: "Mock LinkedIn Post",
        link: "https://linkedin.com",
        postedAt: new Date(),
      },
      {
        source: "twitter",
        content: "Mock Twitter Post",
        link: "https://twitter.com",
        postedAt: new Date(),
      },
    ];

    const fullFeed = [...redditPosts, ...mockPosts];
    res.json(fullFeed);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch feed", error: err.message });
  }
};

exports.savePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedFeeds.push(req.params.id);
    user.credits += 5;
    await user.save();
    await ActivityLog.create({
      userId: user._id,
      action: "save",
      targetId: req.params.id,
    });
    res.json({ message: "Post saved and credited" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save post", error: err.message });
  }
};

exports.sharePost = async (req, res) => {
  try {
    await ActivityLog.create({
      userId: req.user.id,
      action: "share",
      targetId: req.params.id,
    });
    await User.findByIdAndUpdate(req.user.id, { $inc: { credits: 5 } });
    res.json({ message: "Post shared and credited" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to share post", error: err.message });
  }
};

exports.reportPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.reportedFeeds.push(req.params.id);
    user.credits += 5;
    await user.save();
    await ActivityLog.create({
      userId: user._id,
      action: "report",
      targetId: req.params.id,
    });
    res.json({ message: "Post reported and credited" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to report post", error: err.message });
  }
};
