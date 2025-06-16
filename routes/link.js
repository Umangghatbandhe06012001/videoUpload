// routes/link.js
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post("/api/validate-link", async (req, res) => {
  console.log("I'm Inside this API!!!!!!!!!!!");
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ valid: false, message: "Invalid URL input" });
  }

  try {
    const response = await fetch(url, { method: "HEAD", timeout: 3000 });
    return res.status(200).json({ valid: response.ok });
  } catch (err) {
    return res.status(200).json({ valid: false });
  }
});

module.exports = router;

