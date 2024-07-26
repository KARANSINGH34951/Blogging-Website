const mongoose = require('mongoose');
const bcrypt= require("bcrypt")
const {createTokenForUser} = require("../services/authentication")

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    default: "/images/userImg.jpeg",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('User not found!');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect Password');
  const token = createTokenForUser(user);
  return token;
});

const User = mongoose.model("User", userSchema); 
module.exports = User;
