const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRouter = require("./routes/students");

const con = mongoose.connect(
  "mongodb://localhost:27017/studentApp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log(err);
    return console.log("connected to mongo database");
  }
);
const app = express();

app.use(cors());
app.use(express.json());
app.use("/students", studentRouter);


app.listen(3000, (err) => {
  if (err) return console.log(err);
  return console.log("server started on port 3000");
});
