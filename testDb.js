require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  mongoose.disconnect(); // Close after test
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:');
  console.error(err.message);
});
