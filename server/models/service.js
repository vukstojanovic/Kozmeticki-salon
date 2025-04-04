const mongoose = require("mongoose");
const transformToId = require("../utils/transformToId");

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You must enter name of the service."],
    },
    time_in_minutes: {
      type: Number,
      required: [true, "You must enter time of the service."],
    },
    price: {
      type: Number,
      required: [true, "You must enter price of the service."],
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    workers_ids: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Worker",
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.set("toJSON", transformToId);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
