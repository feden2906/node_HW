const User = require('../dataBase/models/User');

module.exports = {
  findAllUsers: async () => {

  },

  findUserById: async () => {

  },

  createUser: async (userObject) => {
    await User.create(userObject);
  },

  deleteUser: async () => {

  }
};
