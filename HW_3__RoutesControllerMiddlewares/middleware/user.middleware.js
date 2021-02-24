const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
  checkIsIdValid: (req, res, next) => {
    try {

      const userId = +req.params.userId;

      if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
        throw new Error('Not Valid ID')
      }

      next();
    } catch (e) {
      res.status(errorCodes.BAD_REQUEST).json(e.message);
    }
  },

  isUserValid: (req, res, next) => {
    try {
      const {name, password, preferLanguage = 'en'} = req.body;

      if (!name || !password) {
        throw new Error('Some filed is empty');
      }

      if(password.length < 6) {
        throw new Error(errorMessages.TOO_WEEK_PASSWORD[preferLanguage]);
      }
      // TODO

      next();
    } catch (e) {
      res.status(errorCodes.BAD_REQUEST).json(e.message);
    }
  }
}

