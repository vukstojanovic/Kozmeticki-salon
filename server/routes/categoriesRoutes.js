const express = require("express");
const router = express.Router();
const categoriesControllers = require("../controllers/categories.controller");
const requireAuth = require("../middlewares/requireAuth");

router.get("/", categoriesControllers.getCategories);
router.get("/:id", requireAuth, categoriesControllers.getCategory);
router.post("/", categoriesControllers.postCategory);
router.put("/:id", categoriesControllers.putCategory);
router.delete("/:id", categoriesControllers.deleteCategory);

module.exports = router;
