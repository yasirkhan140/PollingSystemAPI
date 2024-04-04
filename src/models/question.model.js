import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
