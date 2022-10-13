import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { timestamps: true }
);

mongoose.models = {};
const Users = mongoose.model("Users", UserSchema);

export default Users;
