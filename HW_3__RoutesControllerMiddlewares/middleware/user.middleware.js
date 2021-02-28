const errorCodes = require('../constant/statusCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
  isIdValid: (req, res, next) => {
    try {
      const userId = +req.params.userId;
      const { preferLanguage = 'en' } = req.body;

      if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
        throw new Error(errorMessages.NOT_VALID_ID[preferLanguage]);
      }

      next();
    } catch (e) {
      res.status(errorCodes.BAD_REQUEST)
        .json(e.message);
    }
  },

  isUserValid: (req, res, next) => {
    try {
      const { userName, password, email, preferLanguage = 'en' } = req.body;

      if (!userName || !password || !email) {
        throw new Error(errorMessages.NOT_VALID_FORM[preferLanguage]);
      }

      if (!Number.isNaN(+userName)) {
        throw new Error(errorMessages.NOT_VALID_USERNAME[preferLanguage]);
      }

      if (password.length < 6) {
        throw new Error(errorMessages.TOO_WEEK_PASSWORD[preferLanguage]);
      }

      if (!email.includes('@')) {
        throw new Error(errorMessages.NOT_VALID_EMAIL[preferLanguage]);
      }

      next();
    } catch (e) {
      res.status(errorCodes.BAD_REQUEST).json(e.message);
    }
  }
};
