const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post("/api/validate-link", async (req, res) => {
  const { url } = req.body;

  console.log("Validating URL:", url);

  if (!url || typeof url !== "string") {
    return res.status(400).json({ valid: false, message: "Invalid URL input" });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 3000
    });

    return res.status(200).json({ valid: response.ok });
  } catch (err) {
    console.error("Error validating link:", err.message);
    return res.status(200).json({ valid: false });
  }
});

module.exports = router;


