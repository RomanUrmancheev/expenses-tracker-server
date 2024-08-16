const express = require("express");
const BankAccount = require("../models/BankAccount");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await BankAccount.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something goes wrong. Try again later." });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newBankAccount = await BankAccount.create({
        ...req.body,
        userId: req.user._id,
      });
      console.log(newBankAccount);
      res.status(201).send(newBankAccount);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something goes wrong. Try again later." });
    }
  });

router.delete("/:AccountId", auth, async (req, res) => {
  try {
    const { AccountId } = req.params;
    const removedBankAccount = await BankAccount.findById(AccountId);

    if (removedBankAccount.userId.toString() === req.user._id) {
      await removedBankAccount.deleteOne();
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

    const updatedAccount = await BankAccount.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(updatedAccount);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong. Try again later." });
  }
});

module.exports = router;
