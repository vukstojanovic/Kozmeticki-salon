const express = require("express");
const router = express.Router();
const servicesControllers = require("../controllers/services.controller");

router.get("/", servicesControllers.getServices);
router.get("/:id", servicesControllers.getService);
router.post("/", servicesControllers.postService);
router.put("/:id", servicesControllers.putService);
router.delete("/:id", servicesControllers.deleteService);

module.exports = router;
