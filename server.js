


// const express = require('express');
// const multer = require('multer');
// const validateLinkRoute = require("./routes/link");

// const path = require('path');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());




// app.use(validateLinkRoute);


// // Serve uploaded videos publicly
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

//   // 🔥 Dynamically build the full URL based on Render's domain
//   const videoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

//   res.json({ videoUrl });
// });

// // Test root route
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is Live!");
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ==> ${PORT}`);
// });

require('dotenv').config();


const express = require('express');

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinary');
const validateLinkRoute = require('./routes/link');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Custom routes
app.use(validateLinkRoute);

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'video-uploads',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'webm'],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

// ✅ Upload Route (returns permanent Cloudinary link)
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'Video upload failed' });
  }

  console.log("Hello this is it ===================>", req.file.path);

  res.json({ videoUrl: req.file.path });
});

// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Cloudinary Video Upload Backend is Live!");
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Cloudinary ENV:", {
  name: process.env.CLOUD_NAME,
  key: process.env.CLOUD_API_KEY,
  secret: process.env.CLOUD_API_SECRET
});

  console.log(`Server running on port ==> ${PORT}`);
});

