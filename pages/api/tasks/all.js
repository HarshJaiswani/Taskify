import Tasks from "../../../models/tasks";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "GET") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const tasks = await Tasks.find({ userId: req.user.id });
    res.send(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
