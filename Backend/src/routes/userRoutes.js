
const r = require('express').Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

r.use(protect);
r.get('/', async (req, res) => res.json(await User.find()));

module.exports = r;
