const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Server error while getting user." });
  }
};

module.exports = { getUser };
