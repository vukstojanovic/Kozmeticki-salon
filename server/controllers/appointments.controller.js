const Appointment = require("../models/appointment");

async function getAppointments(req, res) {
  try {
    let appointments;
    const { from, to } = req.query;
    if (from && to) {
      appointments = await Appointment.find({
        date: { $gte: from, $lte: to },
      });
    } else {
      appointments = await Appointment.find({});
    }
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAppointment(req, res) {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function postAppointment(req, res) {
  try {
    let serviceDuration;
    const { date, worker_id, service_id, service_duration } = req.body;

    if (service_duration) {
      serviceDuration = service_duration * 60000;
    } else {
      const service = await Service.findById(service_id);
      serviceDuration = service.time_in_minutes * 60000;
    }

    const appointmentEndTime = date + serviceDuration;

    const overlappingAppointments = await Appointment.find({
      worker_id,
      date: { $lt: appointmentEndTime },
      date: { $gt: date },
    });

    if (overlappingAppointments.length > 0) {
      return res
        .status(400)
        .json({ message: "Overlapping appointments are not allowed." });
    }

    const appointment = await Appointment.create(req.body);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function putAppointment(req, res) {
  try {
    const { id } = req.params;

    let serviceDuration;
    const { date, worker_id, service_id, service_duration } = req.body;

    if (service_duration) {
      serviceDuration = service_duration * 60000;
    } else {
      const service = await Service.findById(service_id);
      serviceDuration = service.time_in_minutes * 60000;
    }

    const appointmentEndTime = date + serviceDuration;

    const overlappingAppointments = await Appointment.find({
      worker_id,
      date: { $lt: appointmentEndTime },
      date: { $gt: date },
    });

    if (overlappingAppointments.length > 0) {
      return res
        .status(400)
        .json({ message: "Overlapping appointments are not allowed." });
    }

    const appointment = await Appointment.findByIdAndUpdate(id, req.body);
    if (!appointment) {
      res.status(404).json({ message: `Appointment with id ${id} not found.` });
    }
    const updatedAppointment = await Appointment.findById(id);
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      res.status(404).json({ message: `Appointment with id ${id} not found.` });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAppointments,
  getAppointment,
  postAppointment,
  putAppointment,
  deleteAppointment,
};
