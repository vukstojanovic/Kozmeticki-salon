const Appointment = require("../models/appointment");

async function deleteOldAppointments() {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const oneMonthAgoInMiliseconds = oneMonthAgo.getTime();

    await Appointment.deleteMany({
      date: { $lt: oneMonthAgoInMiliseconds },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = deleteOldAppointments;
