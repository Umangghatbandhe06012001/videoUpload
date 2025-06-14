const express = require('express');
const multer = require('multer');
const { uploadVideo } = require('../controllers/videoController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/upload', upload.single('video'), uploadVideo);

module.exports = router;
