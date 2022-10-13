import Challenges from "../../../models/challenges";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "DELETE") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const { challengeId } = req.body;

    let challenge = await Challenges.findById(challengeId);

    let todaysDateObj = new Date();
    let todaysDate = `${todaysDateObj.getFullYear()}-${todaysDateObj.getMonth()}-${todaysDateObj.getDate()}`;

    // check if challenge exits
    if (!challenge) {
      return res.status(404).send("Not Found");
    }
    // check if task being accessed belongs to the current loggedin user
    if (challenge.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    let availableData = challenge["didToday"].filter(
      (a) => a["date"] === todaysDate
    );

    if (!availableData) {
      return res.status(404).send("Not Found");
    }

    let data = await Challenges.updateOne(
      { _id: challengeId },
      { $pull: { didToday: { date: todaysDate } } },
      { new: true }
    );

    res.json({ data, availableData, challenge, date: Date(todaysDate) });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
