
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    token: generateToken(user._id),
    user: formatUser(user),
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    token: generateToken(user._id),
    user: formatUser(user),
  });
};

exports.getMe = async (req, res) => {
  res.json({ user: formatUser(req.user) });
};
