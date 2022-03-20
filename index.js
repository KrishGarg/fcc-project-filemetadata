const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const path = require("node:path");

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const { originalname, mimetype, size } = req.file;

  return res.json({
    name: originalname,
    type: mimetype,
    size,
  });
});

if (!process.env.DETA_RUNTIME) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Your app is listening on http://localhost:" + port);
  });
}

module.exports = app;
