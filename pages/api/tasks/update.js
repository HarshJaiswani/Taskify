import Tasks from "../../../models/tasks";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser";

const handler = async (req, res) => {
  if (req.method != "PUT") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    const { text, priority, status, taskId } = req.body;

    // create a newTask obj
    const newTask = {};
    if (text) {
      newTask.text = text;
    }
    if (priority) {
      newTask.priority = priority;
    }
    if (status) {
      newTask.status = status;
    }

    // find the task to update and update it
    let task = await Tasks.findById(taskId);
    // check if task exits
    if (!task) {
      return res.status(404).send("Not Found");
    }
    // check if task being accessed belongs to the current loggedin user
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    task = await Tasks.findByIdAndUpdate(
      taskId,
      { $set: newTask },
      { new: true }
    );
    res.json({ task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

export default connectDb(fetchUser(handler));
