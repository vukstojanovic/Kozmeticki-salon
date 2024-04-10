const express = require("express");
const router = express.Router();
const appointmentControllers = require("../controllers/appointments.controller.js");
const requireAuth = require("../middlewares/requireAuth.js");

router.get("/", appointmentControllers.getAppointments);
router.get("/:id", appointmentControllers.getAppointment);
router.post("/", appointmentControllers.postAppointment);
router.put("/:id", appointmentControllers.putAppointment);
router.delete("/:id", appointmentControllers.deleteAppointment);

module.exports = router;
