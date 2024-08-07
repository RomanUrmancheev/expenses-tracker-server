const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const list = await Transaction.find({ userId });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong. Try again later." });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user._id) {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      res.send(updatedTransaction);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong. Try again later." });
  }
});

module.exports = router;
