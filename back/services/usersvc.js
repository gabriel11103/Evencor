const User = require("../models/user");
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const create = async (userData) => {
  return await User.create(userData);
};

module.exports = { hashPassword, findByEmail, comparePassword, create };
