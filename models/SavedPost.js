const mongoose = require('mongoose');

const savedPostSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    post: {
        _id: String,
        title: String,
        content: String,
        images: [String],
        channel: {
            _id: String,
            name: String,
            owner: String
        },
        author: {
            _id: String,
            name: String,
            profileImage: String
        },
        createdAt: String,
        likeCount: Number,
        dislikeCount: Number,
        commentCount: Number
    },
    savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedPost', savedPostSchema);

