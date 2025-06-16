import express from "express";
import fetch from "node-fetch"; // Install if not already: npm i node-fetch
const router = express.Router();

router.post("/api/validate-link", async (req, res) => {
  console.log("ImInside this api!!!!!!!!!!!");
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ valid: false, message: "Invalid URL input" });
  }

  try {
    const response = await fetch(url, { method: "HEAD", timeout: 3000 });

    if (response.ok) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(200).json({ valid: false });
    }
  } catch (err) {
    return res.status(200).json({ valid: false });
  }
});

export default router;
