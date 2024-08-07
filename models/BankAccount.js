const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

module.exports = model("BankAccount", schema);
