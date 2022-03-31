const { UsersModel } = require('../models/users');

const create = async (userData) => {
  const user = new UsersModel(userData);
  const savedUser = await user.save();
  return savedUser;
};
const get = async (walletAddress) => {
  const user = await UsersModel.findOne({ walletAddress }).lean();
  return user;
};

module.exports = {
  create,
  get,
};
