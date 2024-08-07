const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
    },
    total: { type: Number, required: true },
    accountId: { type: Schema.Types.ObjectId, ref: "BankAccount" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    isDebit: Boolean,
    Date: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Transaction", schema);
