const express = require("express");
const router = express.Router();
const workersControllers = require("../controllers/workers.controller");
const requireAuth = require("../middlewares/requireAuth");

router.get("/", workersControllers.getWorkers);
router.get("/:id", workersControllers.getWorker);
router.post("/", requireAuth, workersControllers.postWorker);
router.put("/:id", requireAuth, workersControllers.putWorker);
router.delete("/:id", requireAuth, workersControllers.deleteWorker);

module.exports = router;
