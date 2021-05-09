const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRouter = require("./routes/students");

const port = process.env.PORT;

const uri = "mongodb+srv://ahmed:dhMgeb$1943@cluster0.rmnbw.mongodb.net/studentsApp?retryWrites=true&w=majority";


const con = mongoose.connect(
  uri,
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


app.listen(port, (err) => {
  if (err) return console.log(err);
  return console.log("server started");
});
