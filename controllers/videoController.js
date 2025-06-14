const Video = require('../models/Video');

const uploadVideo = async (req, res) => {
  try {
    const video = new Video({
      filename: req.file.filename,
      path: req.file.path,
    });
    await video.save();
    res.status(201).json({ message: 'Video uploaded', video });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

module.exports = { uploadVideo };
