const router = require('express').Router();

const userControllers = require('../controllers/user.controllers');

router.get('/', userControllers.getAllUsers);
router.post('/', userControllers.createUser);

router.get('/:userID', userControllers.getUserById);
router.delete('/:userID', userControllers.deleteUser);

module.exports = router;
