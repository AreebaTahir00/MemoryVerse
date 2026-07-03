const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Invalid email format"
    });
   }

    if (password.length < 8) {
    return res.status(400).json({
        message: "Password must be at least 8 characters"
    });
   }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });

    req.session.userId = user._id;
    await req.session.save();

    res.status(201).json({
      message: "Registration Successful",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
     
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Invalid email format"
     });
    }

    if (password.length < 8) {
    return res.status(400).json({
        message: "Password must be at least 8 characters"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Not added email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password Mismatch" });
    }

    req.session.userId = user._id;
    await req.session.save();

    res.status(200).json({
      message: "Login Successful",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// Logout
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "Logout Failed"
            });
        }
        res.clearCookie("connect.sid");

        return res.status(200).json({
            message: "Logout Successful"
        });
    });
};

module.exports = { registerUser, loginUser, getMe, logoutUser };
