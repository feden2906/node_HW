const router = require('express').Router();

const userControllers = require('../controllers/user.controllers');
const mw = require('../middlewares/uset.middlewares');

router.get('/', userControllers.getAllUsers);
router.post('/', mw.isNameVal, mw.isEmailVal, mw.isPassVal, mw.isAgeVal, userControllers.createUser);

router.get('/:userID', userControllers.getUserById);
router.delete('/:userID', userControllers.deleteUser);

module.exports = router;
