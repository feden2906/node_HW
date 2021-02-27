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
      const { userId } = req.params;
      const { preferLanguage = 'en' } = req.body;

      const user = await userService.findUserById(userId, preferLanguage);

      res.json(user);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  createUser: async (req, res) => {
    try {
      const { preferLanguage = 'en' } = req.body;

      await userService.createUser(req.body, preferLanguage);

      res.status(statusCodes.CREATED).json(errorMessages.USER_IS_CREATED[preferLanguage]);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const { preferLanguage = 'en' } = req.body;

      await userService.deleteUser(userId, preferLanguage);

      res.json(errorMessages.USER_WERE_DELETED[preferLanguage]);
    } catch (e) {
      res.status(statusCodes.BAD_REQUEST).json(e.message);
    }
  }
};
