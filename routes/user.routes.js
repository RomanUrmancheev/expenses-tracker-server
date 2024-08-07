const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.get("/:_id", auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong. Try again later." });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong. Try again later." });
  }
});

module.exports = router;
