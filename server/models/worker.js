const mongoose = require("mongoose");

const workerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must enter name of the service."],
  },
  image: {
    type: String,
    required: false,
  },
  services: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Service",
  },
});

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;
