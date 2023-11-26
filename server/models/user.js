const mongoose = require("mongoose");
const transformToId = require("../utils/transformToId");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username."],
    },
    password: {
      type: String,
      required: [true, "Please enter password."],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", transformToId);

const User = mongoose.model("User", userSchema);

module.exports = User;
