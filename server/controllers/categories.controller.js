const Category = require("../models/category");
const Service = require("../models/service");

async function getCategories(_req, res) {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function postCategory(req, res) {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function putCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body);
    if (!category) {
      res.status(404).json({ message: `Category with id ${id} not found.` });
    }
    const updatedCategory = await Category.findById(id);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({ message: `Category with id ${id} not found.` });
    }
    Service.deleteMany({ category_id: id });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
};
