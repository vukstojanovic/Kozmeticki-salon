const Service = require("../models/service");
const Worker = require("../models/worker");

async function getWorkers(_req, res) {
  try {
    const workers = await Worker.find({});
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function postWorker(req, res) {
  try {
    const worker = await Worker.create(req.body);
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function putWorker(req, res) {
  try {
    const { id } = req.params;
    const worker = await Worker.findByIdAndUpdate(id, req.body);
    if (!worker) {
      res.status(404).json({ message: `Worker with id ${id} not found.` });
    }
    const updatedWorker = await Worker.findById(id);
    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteWorker(req, res) {
  try {
    const { id } = req.params;
    const worker = await Worker.findByIdAndDelete(id);
    if (!worker) {
      res.status(404).json({ message: `Worker with id ${id} not found.` });
    }
    Service.updateMany({ workers_id: id }, { $pull: { workers_id: id } });

    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getWorkers,
  postWorker,
  putWorker,
  deleteWorker,
};
