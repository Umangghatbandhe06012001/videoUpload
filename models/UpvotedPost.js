const mongoose = require('mongoose');

const upvotedPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  postId: { type: String, required: true },
});

module.exports = mongoose.model('UpvotedPost', upvotedPostSchema);
