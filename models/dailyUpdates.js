import mongoose from "mongoose";

const DailyUpdatesSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    regret: {
      type: String,
      required: true,
    },
    proud: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.models = {};
const DailyUpdates = mongoose.model("DailyUpdates", DailyUpdatesSchema);

export default DailyUpdates;
