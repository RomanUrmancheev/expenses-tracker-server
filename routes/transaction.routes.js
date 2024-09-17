const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Transaction.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something goes wrong. Try again later." });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newTransaction = await Transaction.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newTransaction);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something goes wrong. Try again later." });
    }
  });

router.delete("/:TransactionId", auth, async (req, res) => {
  try {
    const { TransactionId } = req.params;
    const removedTransaction = await Transaction.findById(TransactionId);

    if (removedTransaction.userId.toString() === req.user._id) {
      await removedTransaction.deleteOne();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "Something goes wrong. Try again later.",
    });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.send(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong. Try again later." });
  }
});

module.exports = router;
