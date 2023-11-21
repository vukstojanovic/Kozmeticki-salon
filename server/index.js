const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoriesRoutes = require("./routes/categoriesRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const workersRoutes = require("./routes/workersRoutes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/categories", categoriesRoutes);
app.use("/services", servicesRoutes);
app.use("/workers", workersRoutes);

mongoose
  .connect(
    "mongodb+srv://vuks838:byzantium1@jobify.brx6x.mongodb.net/Salon-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => console.log("listenting on port 4000"));
  })
  .catch((error) => console.log(error));
