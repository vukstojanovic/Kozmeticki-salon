const express = require("express");
const mongoose = require("mongoose");
const Category = require("./models/category");
const Product = require("./models/product");
const Service = require("./models/service");
const Worker = require("./models/worker");
const app = express();

app.use(express.json());

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

app.get("/categories", async (_req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/categories", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body);
    if (!category) {
      res.status(404).json({ message: `Category with id ${id} not found.` });
    }
    const updatedCategory = await Category.findById(id);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({ message: `Category with id ${id} not found.` });
    }
    category.category_services.forEach(async (serviceId) => {
      await Service.findByIdAndDelete(serviceId);
    });
    const workers = await Worker.find({});
    workers.forEach(async (worker) => {
      const newServiceArray = worker.services.filter(
        (serviceId) => !category.category_services.includes(serviceId)
      );
      await Worker.findByIdAndUpdate(workerId, { services: newServiceArray });
    });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Services

app.get("/services", async (_req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/services", async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body);
    if (!service) {
      res.status(404).json({ message: `Category with id ${id} not found.` });
    }
    const updatedCategory = await Category.findById(id);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({ message: `Category with id ${id} not found.` });
    }
    category.category_services.forEach(async (serviceId) => {
      await Service.findByIdAndDelete(serviceId);
    });
    const workers = await Worker.find({});
    workers.forEach(async (worker) => {
      const newServiceArray = worker.services.filter(
        (serviceId) => !category.category_services.includes(serviceId)
      );
      await Worker.findByIdAndUpdate(workerId, { services: newServiceArray });
    });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://vuks838:byzantium1@jobify.brx6x.mongodb.net/Salon-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => console.log("listenting on port 4000"));
    // Category.populate
  })
  .catch((error) => console.log(error));
