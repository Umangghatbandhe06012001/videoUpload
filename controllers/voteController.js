// controllers/voteController.js
const UpvotedPost = require('../models/UpvotedPost');
const fetch = require('node-fetch'); // or axios if preferred

exports.getUpvotedPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    // Get only the post IDs
    const records = await UpvotedPost.find({ userId });

    const postIds = records.map(r => r.postId);

    // Now fetch full post details from your external API
    const response = await fetch('https://academics.newtonschool.co/api/v1/reddit/post', {
      headers: {
        'projectID': process.env.PROJECT_ID
      }
    });

    const result = await response.json();
    const allPosts = result.data;

    const filteredPosts = allPosts.filter(post => postIds.includes(post._id));

    res.json(filteredPosts);
  } catch (err) {
    console.error('Failed to get upvoted posts:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
