const router = require('express').Router();

const userRouter = require('./user.router');
const loginRouter = require('./login.router');



router.use('/login', loginRouter);
router.use('/users', userRouter);



module.exports = router;
