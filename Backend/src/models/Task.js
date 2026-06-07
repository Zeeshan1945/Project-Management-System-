const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Task",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      priority: String,
      dueDate: String,
      assignedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: String,
      projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    },
    { timestamps: true },
  ),
);
