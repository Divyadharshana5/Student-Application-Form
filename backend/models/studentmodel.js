import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Cat", studentSchema);
