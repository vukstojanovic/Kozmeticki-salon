const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello node api");
});

app.get("/blog", (req, res) => {
  res.send("hello blog");
});

app.listen(4000, () => console.log("listenting on port 4000"));
