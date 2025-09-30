import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Customer from '../models/Customer.js';

const router = express.Router();

// 🔐 Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, role = 'customer' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const Model = role === 'admin' ? Admin : Customer;

    const existing = await Model.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save role explicitly
    const user = new Model({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: `${role} registered successfully` });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// 🔑 Login Route
router.post('/login', async (req, res) => {
  const { email, password, role = 'customer' } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const Model = role === 'admin' ? Admin : Customer;

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '1d' }
    );

    // ✅ Clean user object (remove password) and include role
    const { password: _, ...userData } = user._doc;

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});

export default router;
