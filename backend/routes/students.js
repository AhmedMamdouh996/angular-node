const express = require("express");
const StudentModel = require("../models/students");

const Router = express.Router();

Router.get("/", (request, response) => {
  StudentModel.find({}, (err, studentDoc) => {
    if (!err) return response.json(studentDoc);
    response.send("Cannot get all students");
  });
});

Router.get("/:id", (request, response) => {
  const id = request.params.id;
  const student = StudentModel.findById(id, (err, studentDoc) => {
    if (!err) return response.json(studentDoc);
    response.send("Cannot get the user");
  });
});


Router.post("/", (request, response) => {
  const studentData = request.body;
  const student = new StudentModel(studentData);
  student.save((err, studentDoc) => {
    if (!err) return response.json(studentDoc);
    response.send("Student not saved");
  });
});

Router.post("/search", (request, response) => {
  const searchInput = request.body.search;
  StudentModel.find({ "name": { $regex: '.*' + searchInput + '.*' } }, (err, studentDoc) => {
    if (!err){ 
      return response.json(studentDoc);}
    response.send("Cannot get all students");
  });
});

Router.patch("/:id", (request, response) => {
  const updatedStudentData = request.body;
  const id = request.params.id;
  StudentModel.findByIdAndUpdate(id, updatedStudentData, (err, studentDoc) => {
    if (!err) return response.json(studentDoc);
    response.send("Student not updated");
  });
});

Router.delete("/:id", (request, response) => {
  const id = request.params.id;
  StudentModel.findOneAndDelete(id, (err, studentDoc) => {
    if (!err) return response.json(studentDoc);
    response.send("Cannot delete the student");
  });
});

module.exports = Router;
