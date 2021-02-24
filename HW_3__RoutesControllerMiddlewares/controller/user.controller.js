const userService = require('../service/user.cervice');

module.exports = {
  getAllUsers: (req, res) => {
    try {

      const users = userService.findUsers();

      res.json(users);
    } catch (e) {
      res.status(400).json(e.message);
    }
  },

  getSingleUser: (req, res) => {
    try {
      const {userId} = req.params;

      const user = userService.findUserById(userId);

      res.json(user);
    } catch (e) {
      res.status(400).json(e.message);
    }
  },

  createUser: (req, res) => {
    try {
      userService.createUser(req.body);

      res.status(201).json('User is created');
    } catch (e) {
      res.status(400).json(e.message);
    }
  }
}

