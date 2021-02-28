const User = require('../dataBase/models/User');

module.exports = {
  findAllUsers: async () => {
    const users = await User.find();

    if (users) {
      return users;
    }
  },

  findUserById: async (userID) => {
    const user = await User.findById(userID);
    return user;
  },

  createUser: async (userObject) => {
    await User.create(userObject);
  },

  deleteUser: async (userID) => {
    await User.findOneAndDelete(userID);
  }
};
