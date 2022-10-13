import mongoose from "mongoose";

const DidTodaySchema = mongoose.Schema({
  date: {
    type: String,
    unique: true,
  },
  isDone: Boolean,
});

const ChallengeSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    noOfDays: {
      type: Number,
      required: true,
    },
    challengeQuestion: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    didToday: [DidTodaySchema],
  },
  { timestamps: true }
);

mongoose.models = {};

const Challenges = mongoose.model("Challenges", ChallengeSchema);

export default Challenges;
