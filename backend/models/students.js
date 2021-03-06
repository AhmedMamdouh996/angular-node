const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
  },
  email: { 
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
});

const StudentModel = mongoose.model("Student", studentSchema);

module.exports = StudentModel;
