const express = require("express");
const router = express.Router();
const servicesControllers = require("../controllers/services.controller");
const requireAuth = require("../middlewares/requireAuth");

router.get("/", servicesControllers.getServices);
router.get("/:id", servicesControllers.getService);
router.post("/", requireAuth, servicesControllers.postService);
router.put("/:id", requireAuth, servicesControllers.putService);
router.delete("/:id", requireAuth, servicesControllers.deleteService);

module.exports = router;
