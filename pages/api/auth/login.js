import User from "../../../models/users.js";
import connectDb from "../../../middleware/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).send("Invalid Method");
  }
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    // let user = await User.find();
    // res.status(200).json({ user });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials!" });
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials!" });
    }

    const data = {
      user: {
        id: user.id,
        username: user.username,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    res.send({ authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error!!" });
  }
};

export default connectDb(handler);
