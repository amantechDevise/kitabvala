const { User, ContactUs } = require("../../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hashedPassword });

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

      return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // LOGIN
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

    Adminlogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  if (user.role !== 2) {
      return res.status(403).json({ message: 'Access denied. Not an Admin user.' });
    }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '24h' });

      return res.status(200).json({ message: ' Admin Login successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

dashboard: async (req, res) => {
  try {
    const userid = req.user.id;
    const loginUser = await User.findOne({
      where: { id: userid },
       attributes: ['name', 'email']
    });
    const totleUser = await User.count({
      where: { role: 1 }
    });
    return res.status(200).json({ message: 'Admin dashboard', loginUser,totleUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},


allUser: async (req, res) => {
  try {
    const alluser = await User.findAll({
      where: { role: 1 },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      message: 'All Users fetched successfully',
      data: alluser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},
getUserById: async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({
      where: { id: userId, role: 1 }, 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},





contactList:async(req,res)=>{
  try {
    const  contactLis = await ContactUs.findAll()
     return res.status(200).json({
        message: 'Contact Us fetched successfully',
        data: contactLis,
      });
  } catch (error) {
       console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
},
}