import User from "../../../models/users.js";
import connectDb from "../../../middleware/connectDb";
import fetchUser from "../../../middleware/fetchuser.js";

const handler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).send("Method not allowed");
  }
  try {
    let userId = req.user.id;
    const user = await User.findOne({ _id: userId }).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!!");
  }
};

export default connectDb(fetchUser(handler));
