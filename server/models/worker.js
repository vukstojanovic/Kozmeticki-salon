const mongoose = require("mongoose");
const transformToId = require("../utils/transformToId");

const workerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You must enter name of the service."],
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

workerSchema.set("toJSON", transformToId);

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;
