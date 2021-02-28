const userService = require('../services/user.services');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.findAllUsers();

      res.json(users);
    } catch (e) {
      res.status().json(e.message);
    }
  },

  getUserById: async ({ params: { userID } }, res) => {
    try {
      const user = await userService.findUserById(userID);

      res.json(user);
    } catch (e) {
      res.status().json(e.message);
    }
  },

  createUser: async (req, res) => {
    try {
      await userService.createUser(req.body);

      res.status(201).json('Created');
    } catch (e) {
      res.status(300).json(e.message);
    }
  },

  deleteUser: async ({ params: { userID } }, res) => {
    try {
      await userService.deleteUser(userID);
      res.json('deleted');
    } catch (e) {
      res.status().json(e.message);
    }
  }
};
