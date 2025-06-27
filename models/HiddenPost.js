const mongoose = require('mongoose');

const hiddenPostSchema = new mongoose.Schema({
  userId: {
    type: String, // store user ID as string
    required: true,
    unique: true,
  },
  hiddenPosts: [
    {
      type: String, // post IDs (from external API)
    }
  ]
});

module.exports = mongoose.model('HiddenPost', hiddenPostSchema);
