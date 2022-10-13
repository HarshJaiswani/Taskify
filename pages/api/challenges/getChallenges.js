import Challenges from "../../../models/challenges";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "GET") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const challenges = await Challenges.find({ userId: req.user.id });
    res.status(200).send(challenges);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

export default connectDb(fetchUser(handler));
