const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serviceControllers = require("./controllers/services.controller.js");
const categoriesControllers = require("./controllers/categories.controller.js");
const workersControllers = require("./controllers/workers.controller.js");
const app = express();

app.use(express.json());
app.use(cors());

// 1. Categories

app.get("/categories", categoriesControllers.getCategories);
app.get("/categories/:id", categoriesControllers.getCategory);
app.post("/categories", categoriesControllers.postCategory);
app.put("/categories/:id", categoriesControllers.putCategory);
app.delete("/categories/:id", categoriesControllers.deleteCategory);

// 2. Services

app.get("/services", serviceControllers.getServices);
app.get("/services/:id", serviceControllers.getService);
app.post("/services", serviceControllers.postService);
app.put("/services/:id", serviceControllers.putService);
app.delete("/services/:id", serviceControllers.deleteService);

// 3. Workers

app.get("/workers", workersControllers.getWorkers);
app.get("/workers/:id", workersControllers.getWorker);
app.post("/workers", workersControllers.postWorker);
app.put("/workers/:id", workersControllers.putWorker);
app.delete("/workers/:id", workersControllers.deleteWorker);

mongoose
  .connect(
    "mongodb+srv://vuks838:byzantium1@jobify.brx6x.mongodb.net/Salon-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => console.log("listenting on port 4000"));
  })
  .catch((error) => console.log(error));
