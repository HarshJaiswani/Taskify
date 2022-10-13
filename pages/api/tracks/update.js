import dailyUpdates from "../../../models/dailyUpdates";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "PUT") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const { regret, proud, trackId } = req.body;

    // create a newUpdate obj
    const newUpdate = {};
    if (regret) {
      newUpdate.regret = regret;
    }
    if (proud) {
      newUpdate.proud = proud;
    }

    // find the update to update and update it
    let update = await dailyUpdates.findById(trackId);
    // check if update exits
    if (!update) {
      return res.status(404).send("Not Found");
    }
    // check if update being accessed belongs to the current loggedin user
    if (update.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    update = await dailyUpdates.findByIdAndUpdate(
      trackId,
      { $set: newUpdate },
      { new: true }
    );
    res.json({ update });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
