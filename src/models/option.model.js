import mongoose, { Schema } from "mongoose";

const optionSchema = new Schema({
  text: {
    type: "String",
    required: [true, "text is required "],
    unque: true,
    index: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  link_to_votes: {
    type: String,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
});

export const Option = mongoose.model("Option", optionSchema);
