const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoriesRoutes = require("./routes/categoriesRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const workersRoutes = require("./routes/workersRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");
// const cron = require("node-cron");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/categories", categoriesRoutes);
app.use("/services", servicesRoutes);
app.use("/workers", workersRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/auth", authRoutes);

// cron.schedule("0 0 * *", async () => {
//   try {
//     await deleteAppointmentsBeforeOneMonth();
//     console.log("Appointment cleanup job completed successfully.");
//   } catch (error) {
//     console.error("Error running appointment cleanup job:", error);
//   }
// });

mongoose
.connect(
    "mongodb://localhost:27017/salon"
    // "mongodb+srv://vuks838:byzantium1@jobify.brx6x.mongodb.net/Salon-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => console.log("listenting on port 4000"));
  })
  .catch((error) => console.log("error:::", error));
