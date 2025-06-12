const authService = require("../services/auth.service");

const signIn = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: `Body cannot be empty!`,
    });
  }
  const keys = Object.keys(req.body);
  const requireKeys = ["email", "password"];
  const missingKeys = requireKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(",")}`,
    });
  }

  const result = await authService.signIn(req.body);

  if (result.userNotFound) {
    return res.status(404).json({
      message: `User not found with the provided email ${req.body.email}`,
    });
  }

  if (result.passwordMisMatch) {
    return res.status(400).json({
      message: `The password is incorrect`,
    });
  }
  res.json({ token: result.token });
};

const signUp = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: `Body cannot be empty!`,
    });
  }

  const keys = Object.keys(req.body);
  const { email, password } = req.body;

  const requireKeys = ["name", "phoneNumber", "email", "password"];
  const missingKeys = requireKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(",")}`,
    });
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%@*]).{8,}$/;

  if (String(password).length < 8) {
    return res.status(400).json({
      message: `The password must be minimum of 8 chars.)`,
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: `Password should have special characters`,
    });
  }

  const result = await authService.signUp(req.body);

  if (result.userAlreadyExists) {
    return res.status(400).json({
      message: `User already exist ${email}`,
    });
  }
  res.status(201).json({ message: `User with ${email} created successfully` });
};

const signOut = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  await authService.signOut(token);

  res.status(204).json({
    message: `Signout successfully`,
  });
};

const getLoggedInUser = async (req, res) => {
  const user = req.user;

  const userData = await authService.getLoggedInUser(user._id);

  res.status(200).json({
    message: `User fetched successfully`,
    user: userData,
  });
};

module.exports = { signIn, signUp, signOut, getLoggedInUser };
