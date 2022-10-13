import dailyUpdates from "../../../models/dailyUpdates";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "GET") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const updates = await dailyUpdates.find({ userId: req.user.id });
    res.send(updates);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
