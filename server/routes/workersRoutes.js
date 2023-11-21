const express = require("express");
const router = express.Router();
const workersControllers = require("../controllers/workers.controller");

router.get("/", workersControllers.getWorkers);
router.get("/:id", workersControllers.getWorker);
router.post("/", workersControllers.postWorker);
router.put("/:id", workersControllers.putWorker);
router.delete("/:id", workersControllers.deleteWorker);

module.exports = router;
