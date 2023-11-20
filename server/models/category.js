const mongoose = require("mongoose");
const transformToId = require("../utils/transformToId");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter category name"],
    },
    // category_services: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "Service",
    // },
  },
  {
    timestamps: true,
  }
);

categorySchema.set("toJSON", transformToId);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
