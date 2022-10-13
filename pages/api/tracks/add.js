import dailyUpdates from "../../../models/dailyUpdates";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const { regret, proud } = req.body;
    const newUpdate = new dailyUpdates({
      regret,
      proud,
      userId: req.user.id,
    });
    const saveUpdate = await newUpdate.save();
    res.send(saveUpdate);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
