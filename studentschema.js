const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  Name: String,
  Roll: Number,
});

module.exports = mongoose.model("student", StudentSchema, "Students");
