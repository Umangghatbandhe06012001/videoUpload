const express = require('express');
const router = express.Router();
const SavedPost = require('../models/SavedPost');

// Save a post
router.post('/', async (req, res) => {
    const { userId, post } = req.body;
    try {
        const alreadySaved = await SavedPost.findOne({ userId, 'post._id': post._id });
        if (alreadySaved) return res.status(400).json({ message: "Post already saved" });

        const newSave = new SavedPost({ userId, post });
        await newSave.save();
        res.status(201).json({ message: 'Post saved!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all saved posts for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const savedPosts = await SavedPost.find({ userId: req.params.userId });
    res.status(200).json(savedPosts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch saved posts.' });
  }
});

// Optional: Remove a saved post
// Remove a saved post
router.delete('/:userId/:postId', async (req, res) => {
  try {
    await SavedPost.deleteOne({ userId: req.params.userId, 'post._id': req.params.postId });
    res.status(200).json({ message: 'Post removed from saved.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove saved post.' });
  }
});


module.exports = router;
