const mongo = require("mongoose");

const userSchema = new mongo.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  sessToken: [
    {
      type: String,
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongo.model("User", userSchema);
