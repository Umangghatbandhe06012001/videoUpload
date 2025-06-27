const express = require('express');
const router = express.Router();
const HiddenPost = require('../models/HiddenPost');

// ✅ Hide a post
router.post('/hide', async (req, res) => {
  const { userId, postId } = req.body;

  try {
    let record = await HiddenPost.findOne({ userId });

    if (!record) {
      record = new HiddenPost({ userId, hiddenPosts: [postId] });
    } else if (!record.hiddenPosts.includes(postId)) {
      record.hiddenPosts.push(postId);
    }

    await record.save();
    res.json({ success: true, message: 'Post hidden successfully' });
  } catch (err) {
    console.error('Error hiding post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Get hidden posts
router.get('/:userId', async (req, res) => {
  try {
    const record = await HiddenPost.findOne({ userId: req.params.userId });

    res.json({ hiddenPosts: record?.hiddenPosts || [] });
  } catch (err) {
    console.error('Error fetching hidden posts:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Unhide a post
router.post('/unhide', async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const record = await HiddenPost.findOne({ userId });

    if (record) {
      record.hiddenPosts = record.hiddenPosts.filter(id => id !== postId);
      await record.save();
    }

    res.json({ success: true, message: 'Post unhidden successfully' });
  } catch (err) {
    console.error('Error unhiding post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
