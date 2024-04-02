const mongoose = require("mongoose");
const transformToId = require("../utils/transformToId");

const appointmentSchema = mongoose.Schema(
  {
    date: {
      type: Number,
      required: [true, "You must enter date of the appointment."],
    },
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "You must enter wanted service id."],
    },
    worker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: [true, "You must enter wanted worker id."],
    },
    service_duration: {
      type: Number,
    },
    cutomer_name: {
      type: String,
      required: [true, "You must enter customer name."],
    },
    customer_number: {
      type: Number,
      required: [true, "You must enter customer number."],
    },
    customer_email: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.set("toJSON", transformToId);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
