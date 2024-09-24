import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Student } from "./models/studentmodel.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to MERN Stack Tutorial");
});

//Route for Save
app.post("/students", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.class ||
      !request.body.year ||
      !request.body.age ||
      !request.body.branch
    ) {
      return response.status(400).send({
        message: "Send all required fields:title,author,publishYear",
      });
    }
    const newStudent = {
      name: request.body.name,
      class: request.body.class,
      year: request.body.year,
      age: request.body.age,
      branch: request.body.branch,
    };
    const student = await Student.create(newStudent);
    return response.status(201).send(student);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Get all  from database
app.get(`/students`, async (request, response) => {
  try {
    const students = await Student.find({});
    return response.status(200).json({
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Get from database by id
app.get(`/students/:id`, async (request, response) => {
  try {
    const { id } = request.params;
    const trimmedId = id.trim();
    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return response
        .status(400)
        .send({ message: "Invalid Student ID format" });
    }
    const student = await Student.findById(trimmedId);
    return response.status(200).json(student);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update
app.put("/students/:id", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.class ||
      !request.body.year ||
      !request.body.age ||
      !request.body.branch
    ) {
      return response.status(400).send({
        message: "Send all required fields:name,class,year,age,branch",
      });
    }
    const { id } = request.params;

    const result = await Student.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Student not found" });
    }
    return response
      .status(200)
      .send({ message: "Student update successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Delete a Book
app.delete("/students/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const trimmedId = id.trim();
    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return response
        .status(400)
        .send({ message: "Invalid Student ID format" });
    }
    const result = await Student.findByIdAndDelete(trimmedId);

    if (!result) {
      return response.status(404).json({ message: "Student not found" });
    }
    return response
      .status(200)
      .send({ message: "Student deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
