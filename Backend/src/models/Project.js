const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Project",
  new mongoose.Schema(
    {
      name: String,
      description: String,
      status: String,
      createdDate: String,
    },
    { timestamps: true },
  ),
);
