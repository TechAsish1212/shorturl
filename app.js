const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Store mappings in-memory (for simplicity)
const urlDatabase = {};

// Home page
app.get("/", (req, res) => {
  res.render("index", { shortUrl: null });
});

// Shorten handler
app.post("/shorten", (req, res) => {
  const longUrl = req.body.longUrl;
  const slug = Math.random().toString(36).substring(2, 8);
  const shortUrl = `http://localhost:${PORT}/${slug}`;
  urlDatabase[slug] = longUrl;
  res.render("index", { shortUrl });
});

// Redirect to original URL
app.get("/:slug", (req, res) => {
  const longUrl = urlDatabase[req.params.slug];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("Short URL not found");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
