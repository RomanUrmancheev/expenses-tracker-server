const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
    },
    email: { type: String, required: true, unique: true },
    password: String,
    bankAccounts: [{ type: Schema.Types.ObjectId, ref: "BankAccount" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
