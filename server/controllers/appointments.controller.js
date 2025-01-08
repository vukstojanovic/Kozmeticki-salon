const Appointment = require("../models/appointment");

async function getAppointments(req, res) {
  try {
    let appointments;
    const { from, to, worker_id } = req.query;
    if (from && to) {
      appointments = await Appointment.find({
        worker_id,
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
    // const { date, worker_id, service_duration } = req.body;
    // const newAppointmentEnd = date + service_duration * 60000;

    // const overlappingAppointments = await Appointment.find({
    //   worker_id,
    //   $expr: {
    //     $and: [
    //       { $lt: ["$date", newAppointmentEnd] },
    //       {
    //         $gt: [
    //           { $add: ["$date", { $multiply: ["$service_duration", 60000] }] },
    //           date,
    //         ],
    //       },
    //     ],
    //   },
    // });

    // if (overlappingAppointments.length > 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Overlapping appointments are not allowed." });
    // }

    const appointment = await Appointment.create(req.body);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// async function postAppointment(req, res) {
//   try {
//     const { date, worker_id, service_duration } = req.body;
//     const newAppointmentEnd = date + service_duration * 60000;

//     const existingAppointments = await Appointment.find({
//       $and: [
//         { worker_id: worker_id },
//         {
//           $or: [
//             {
//               $and: [
//                 { date: { $lte: date } },
//                 {
//                   $expr: {
//                     $gt: [
//                       {
//                         $add: [
//                           "$date",
//                           { $multiply: ["$service_duration", 60000] },
//                         ],
//                       },
//                       newAppointmentEnd,
//                     ],
//                   },
//                 },
//               ],
//             },
//             {
//               $and: [
//                 { date: { $lt: newAppointmentEnd } },
//                 {
//                   $expr: {
//                     $gte: [
//                       {
//                         $add: [
//                           "$date",
//                           { $multiply: ["$service_duration", 60000] },
//                         ],
//                       },
//                       newAppointmentEnd,
//                     ],
//                   },
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });

//     if (existingAppointments.length > 0) {
//       return res
//         .status(400)
//         .json({ message: "Appointment overlaps with existing appointments." });
//     }

//     const appointment = await Appointment.create(req.body);
//     res.status(200).json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

async function putAppointment(req, res) {
  try {
    const { id } = req.params;

    const { date, worker_id, service_duration } = req.body;
    const newAppointmentEnd = date + service_duration * 60000;

    const overlappingAppointments = await Appointment.find({
      worker_id,
      $expr: {
        $and: [
          { $lt: ["$date", newAppointmentEnd] },
          {
            $gt: [
              { $add: ["$date", { $multiply: ["$service_duration", 60000] }] },
              date,
            ],
          },
        ],
      },
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
