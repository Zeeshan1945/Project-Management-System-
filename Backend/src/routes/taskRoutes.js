
const r = require('express').Router();
const Task = require('../models/Task');
const { protect } = require('../middleware/authMiddleware');

r.use(protect);
r.get('/', async (req, res) => res.json(await Task.find()));
r.post('/', async (req, res) => res.status(201).json(await Task.create(req.body)));
r.put('/:id', async (req, res) =>
  res.json(await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }))
);
r.patch('/:id/status', async (req, res) =>
  res.json(
    await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
  )
);
r.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ deletedId: req.params.id });
});

module.exports = r;
