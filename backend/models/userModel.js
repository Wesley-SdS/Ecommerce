const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: String,
    profilePic: String,
    role: String
  },
  {
    timestamps: true
  }
);

const userModel = mongoose.model("User", usersSchema);

module.exports = userModel;
