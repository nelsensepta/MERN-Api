const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Register
const Auth = new Schema({
  username: {
    type: String,
    required: true, // wajib ada title
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Auth", Auth);
