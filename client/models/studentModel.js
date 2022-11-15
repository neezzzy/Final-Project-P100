const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = {
  Student,
};
