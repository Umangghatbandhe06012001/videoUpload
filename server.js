// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Multer storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Folder to save uploads
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + '-' + file.originalname;
//     cb(null, uniqueName);
//   }
// });

// const upload = multer({ storage });

// // ✅ Upload route
// app.post('/upload', upload.single('video'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No video file uploaded' });
//   }

//   const videoUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
//   res.json({ videoUrl });
// });

// app.get("/", (req, res) => {
//   res.send("🚀 Backend is Live!");
// });


// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port  ==> ${PORT}`);
// });

const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded videos publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to save uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ Upload route
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video file uploaded' });
  }

  // 🔥 Dynamically build the full URL based on Render's domain
  const videoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({ videoUrl });
});

// Test root route
app.get("/", (req, res) => {
  res.send("🚀 Backend is Live!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ==> ${PORT}`);
});
