var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

if (!process.env.DETA_RUNTIME) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Your app is listening on http://localhost:" + port);
  });
}

module.exports = app;
