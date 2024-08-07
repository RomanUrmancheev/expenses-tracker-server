const express = require("express");
const BankAccount = require("../models/BankAccount");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const list = await BankAccount.find({ userId });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong. Try again later." });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user._id) {
      const updatedAccount = await BankAccount.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.send(updatedAccount);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong. Try again later." });
  }
});

module.exports = router;
