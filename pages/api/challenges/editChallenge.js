import Challenges from "../../../models/challenges";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "PUT") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const { title, challengeQuestion, noOfDays, challengeId, isCompleted } =
      req.body;

    // create a newChallenge obj
    const newChallenge = {};
    if (title) {
      newChallenge.title = title;
    }
    if (challengeQuestion) {
      newChallenge.challengeQuestion = challengeQuestion;
    }
    if (noOfDays) {
      newChallenge.noOfDays = noOfDays;
    }
    if (isCompleted) {
      newChallenge.isCompleted = isCompleted;
    }

    // find the challenge to update and update it
    let challenge = await Challenges.findById(challengeId);
    // check if challenge exits
    if (!challenge) {
      return res.status(404).send("Not Found");
    }
    // check if task being accessed belongs to the current loggedin user
    if (challenge.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    challenge = await Challenges.findByIdAndUpdate(
      challengeId,
      { $set: newChallenge },
      { new: true }
    );
    res.json({ challenge });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
