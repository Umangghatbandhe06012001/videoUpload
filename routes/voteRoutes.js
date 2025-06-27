const express = require('express');
const router = express.Router();
const UpvotedPost = require('../models/UpvotedPost');
const DownvotedPost = require('../models/DownvotedPost');
const { getUpvotedPosts } = require('../controllers/voteController');

router.get('/upvoted/:userId', getUpvotedPosts);

// Toggle Upvote
router.post('/upvote', async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const existing = await UpvotedPost.findOne({ userId, postId });

    if (existing) {
      // Already upvoted — remove it (toggle off)
      await UpvotedPost.deleteOne({ userId, postId });
      return res.json({ message: 'Upvote removed' });
    } else {
      // Check and remove from downvotes if needed
      await DownvotedPost.deleteOne({ userId, postId });

      // Add to upvoted posts
      await UpvotedPost.create({ userId, postId });
      return res.json({ message: 'Upvoted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error in upvoting' });
  }
});

// Toggle Downvote
router.post('/downvote', async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const existing = await DownvotedPost.findOne({ userId, postId });

    if (existing) {
      // Already downvoted — remove it (toggle off)
      await DownvotedPost.deleteOne({ userId, postId });
      return res.json({ message: 'Downvote removed' });
    } else {
      // Remove from upvotes if needed
      await UpvotedPost.deleteOne({ userId, postId });

      // Add to downvoted posts
      await DownvotedPost.create({ userId, postId });
      return res.json({ message: 'Downvoted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error in downvoting' });
  }
});

// Optional: Fetch upvoted/downvoted posts for a user
router.get('/upvotes/:userId', async (req, res) => {
  try {
    const posts = await UpvotedPost.find({ userId: req.params.userId });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upvoted posts' });
  }
});

router.get('/downvotes/:userId', async (req, res) => {
  try {
    const posts = await DownvotedPost.find({ userId: req.params.userId });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch downvoted posts' });
  }
});

module.exports = router;
