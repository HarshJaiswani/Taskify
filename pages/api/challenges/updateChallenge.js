import Challenges from "../../../models/challenges";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "PUT") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const { todaysStatus, challengeId } = req.body;

    let challenge = await Challenges.findById(challengeId);

    let todaysDateObj = new Date();
    let todaysDate = `${todaysDateObj.getFullYear()}-${todaysDateObj.getMonth()}-${todaysDateObj.getDate()}`;

    // create a new obj
    const todaysUpdate = {
      date: todaysDate,
      isDone: todaysStatus,
    };

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
      {
        $push: { didToday: todaysUpdate },
      },
      { upsert: true, new: true }
    );

    res.json({ challenge });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
