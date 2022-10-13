import Tasks from "../../../models/tasks";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const { text } = req.body;
    const newTask = new Tasks({
      text,
      priority: 1,
      status: "todo",
      userId: req.user.id,
    });
    const saveTask = await newTask.save();
    res.send(saveTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
