const mongoose = require("mongoose");

const feedItemSchema = new mongoose.Schema({
  source: String,
  content: String,
  link: String,
  postedAt: Date,
});

module.exports = mongoose.model("FeedItem", feedItemSchema);
