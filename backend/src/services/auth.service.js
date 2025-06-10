const { createJWTToken } = require("../utils/jwt.util");
const User = require("../models/user.model");
const RevokedToken = require("../models/revokedToken.model");
const { createHash, compareHash } = require("../utils/hash.util");

const signIn = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email: email });

  if (!user) {
    return { userNotFound: true };
  }

  const ispasswordMatched = await compareHash(password, user.password);

  if (!ispasswordMatched) {
    return { passwordMisMatch: true };
  }

  delete user.password;
  const token = createJWTToken(user.toJSON());
  return { token };
};

const signUp = async (data) => {
  const { email } = data;

  const user = await User.findOne({ email: email });

  if (user) {
    return { userAlreadyExists: true };
  }

  data.password = await createHash(data.password);

  const newUser = new User(data);
  const savedUser = await newUser.save();

  return { User: savedUser };
};

const signout = async (token) => {
  const newToken = new RevokedToken({ token });
  await newToken.save();
};

const getLoggedInUser = async (userId) => {
  const user = await User.findById(userId, { password: 0 });

  return user;
};

module.exports = { signIn, signUp, signout, getLoggedInUser };
