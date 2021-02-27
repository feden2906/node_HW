const userService = require('../services/user.services');

module.exports = {
  // getAllUsers: async (req, res) => {
  //   try {
  //     const users = await
  //   } catch (e) {
  //     res.status().json(e.message);
  //   }
  // },
  //
  // getUserById: async (req, res) => {
  //   try {
  //     const user = await
  //   } catch (e) {
  //     res.status().json(e.message);
  //   }
  // },

  createUser: async (req, res) => {
    try {
      console.log(req.body);
      await userService.createUser(req.body);
      res.status(201).json('Created');
    } catch (e) {
      res.status().json(e.message);
    }
  }

  // deleteUser: async (req, res) => {
  //   try {
  //     await
  //   } catch (e) {
  //     res.status().json(e.message);
  //   }
  // }
};
