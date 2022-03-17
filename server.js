const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const StudentModel = require("./studentschema");
const mongoose = require("mongoose");

app.listen(port, function () {
  console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

database = "mongodb://localhost:27017/College";

mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected"));

app.get("/api", (req, res) => {
  res.json({ message: "success" });
});

app.post("/save", (req, res) => {
  let newStudent = new StudentModel();
  newStudent.Name = req.body.Name;
  newStudent.Roll = req.body.Roll;

  newStudent.save((err, data) => {
    if (err) {
      console.log(err);
      return res.json({ status: "fail" });
    } else {
      console.log("Data Inserted");
      console.log("data: ", data);
      return res.json({ status: "success" });
    }
  });
});

app.get("/staff", (req, res) => {
  StudentModel.find((err, data) => {
    if (err) {
      console.log(err);
      return res.json({ status: "fail" });
    } else {
      // res.send(data);
      console.log(typeof data);
      return res.json(data);
    }
  });
});

app.get("/lokesh", (req, res) => {
  StudentModel.findOne({ Name: "lokesh" }, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ status: "fail" });
    } else {
      if (data == null) {
        return res.json({ message: "No record found..!!" });
      }

      console.log(data);
      message = {
        name: data.Name,
        roll: data.Roll,
      };
      return res.send(message);
    }
  });
});
