const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send("hello node api");
});

app.get("/blog", (req, res) => {
  res.send("hello blog");
});

mongoose
  .connect(
    "mongodb+srv://vuks838:byzantium1@jobify.brx6x.mongodb.net/Salon-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => console.log("listenting on port 4000"));
  })
  .catch((error) => console.log(error));
