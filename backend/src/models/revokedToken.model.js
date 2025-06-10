const mongoose = require("mongoose");

const RevokedTokenSchema = new mongoose.Schema(
  {
    token: String,
  },

  { timestamps: true }
);

const RevokedToken = mongoose.model("revoked-tokens", RevokedTokenSchema);
module.exports = RevokedToken;
