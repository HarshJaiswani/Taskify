import Challenges from "../../../models/challenges";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "DELETE") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    // find the challenge to be deleted and delete it
    const { challengeId } = req.body;
    let challenge = await Challenges.findById(challengeId);
    // check if challenge exits
    if (!challenge) {
      return res.status(404).send("Not Found");
    }
    // check if challenge being accessed belongs to the current loggedin user
    if (challenge.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    challenge = await Challenges.findByIdAndDelete(challengeId);
    res.json({
      Success: "The challenge has been successfully deleted",
      challenge,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
