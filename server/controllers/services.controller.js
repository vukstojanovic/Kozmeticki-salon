const Service = require("../models/service");

async function getServices(_req, res) {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getService(req, res) {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function postService(req, res) {
  try {
    const service = await Service.create(req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function putService(req, res) {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body);
    if (!service) {
      res.status(404).json({ message: `Service with id ${id} not found.` });
    }
    const updatedService = await Service.findById(id);
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteService(req, res) {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      res.status(404).json({ message: `Service with id ${id} not found.` });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getServices,
  getService,
  postService,
  putService,
  deleteService,
};
