import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
    },
    status: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

mongoose.models = {};
const Tasks = mongoose.model("Tasks", TaskSchema);

export default Tasks;
