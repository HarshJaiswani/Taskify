import User from "../../../models/users.js";
import connectDb from "../../../middleware/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).json({ error: "Invalid Method" });
  }
  try {
    // Checking if user with the same username already exits
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry! a user with this username already exists" });
    }
    // hashing password and adding salt to it
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Creating user
    user = await User.create({
      username: req.body.username,
      password: secPass,
    });

    // json web token authentication
    const data = {
      user: {
        id: user._id,
        username: user.username,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    res.send({ authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!!");
  }
};

export default connectDb(handler);
