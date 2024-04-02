const express = require("express");
const router = express.Router();
const categoriesControllers = require("../controllers/categories.controller");
const requireAuth = require("../middlewares/requireAuth");

router.get("/", categoriesControllers.getCategories);
router.get("/:id", categoriesControllers.getCategory);
router.post("/", requireAuth, categoriesControllers.postCategory);
router.put("/:id", requireAuth, categoriesControllers.putCategory);
router.delete("/:id", requireAuth, categoriesControllers.deleteCategory);

module.exports = router;
