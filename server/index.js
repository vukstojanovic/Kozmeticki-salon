const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product");
const serviceControllers = require("./controllers/services.controller.js");
const categoriesControllers = require("./controllers/categories.controller.js");
const workersControllers = require("./controllers/workers.controller.js");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello node api");
});

app.get("/blog", (req, res) => {
  res.send("hello blog");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).json({ message: `Cannot find product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: `Cannot find product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// real app endpoints start here

// 1. Categories

app.get("/categories", categoriesControllers.getCategories);
app.post("/categories", categoriesControllers.postCategory);
app.put("/categories/:id", categoriesControllers.putCategory);
app.delete("/categories/:id", categoriesControllers.deleteCategory);

// 2. Services

app.get("/services", serviceControllers.getServices);
app.post("/services", serviceControllers.postService);
app.put("/services/:id", serviceControllers.putService);
app.delete("/services/:id", serviceControllers.deleteService);

// 3. Workers

app.get("/workers", workersControllers.getWorkers);
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
