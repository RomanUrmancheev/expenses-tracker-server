const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
    },
    total: { type: Number, required: true },
    bankAccountId: { type: Schema.Types.ObjectId, ref: "BankAccount" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    date: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Transaction", schema);
