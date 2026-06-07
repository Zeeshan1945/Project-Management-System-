
const r = require('express').Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

r.use(protect);
r.get('/', async (req, res) => res.json(await Project.find()));
r.post('/', async (req, res) =>
  res.status(201).json(
    await Project.create({
      ...req.body,
      createdDate: new Date().toISOString().split('T')[0],
    })
  )
);
r.put('/:id', async (req, res) =>
  res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }))
);
r.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ deletedId: req.params.id });
});

module.exports = r;
