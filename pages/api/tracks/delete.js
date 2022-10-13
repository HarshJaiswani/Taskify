import dailyUpdates from "../../../models/dailyUpdates";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "DELETE") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const { trackId } = req.body;
    // find the update to be deleted and delete it
    let update = await dailyUpdates.findById(trackId);
    // check if update exits
    if (!update) {
      return res.status(404).send("Not Found");
    }
    // check if update being accessed belongs to the current loggedin user
    if (update.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    update = await dailyUpdates.findByIdAndDelete(trackId);
    res.json({ Success: "The update has been successfully deleted", update });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
