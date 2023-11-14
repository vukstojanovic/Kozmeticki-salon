const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
  },
  category_services: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Service",
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
