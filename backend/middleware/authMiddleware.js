const User = require("../models/User");
// Checks User Exist or not
// Authenticated users can access protected routes
const protect = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user =
      await User.findById(
        req.session.userId
      ).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = protect;