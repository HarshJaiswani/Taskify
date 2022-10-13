import Challenges from "../../../models/challenges";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const { title, noOfDays, challengeQuestion } = req.body;
    const newChallenge = new Challenges({
      title,
      challengeQuestion,
      noOfDays,
      isCompleted: false,
      didToday: [],
      userId: req.user.id,
    });
    const saveChallenge = await newChallenge.save();
    res.send(saveChallenge);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
};

export default connectDb(fetchUser(handler));
