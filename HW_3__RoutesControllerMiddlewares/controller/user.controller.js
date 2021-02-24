const userService = require('../service/user.cervice');
const statusCodes = require('../constant/statusCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const { preferLanguage = 'en' } = req.body;

      const users = await userService.findAllUsers(preferLanguage, req.query);

      res.json(users);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },


  getSingleUser: async (req, res) => {
    try {
      const {userId} = req.params;
      const { preferLanguage = 'en' } = req.body;

      const user = await userService.findUserById(userId, preferLanguage);

      res.json(user);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },







  createUser: (req, res) => {
    try {
      userService.createUser(req.body);

      res.status(statusCodes.CREATED).json('User is created');
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
}

