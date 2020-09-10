const express = require('express');
const apiRouter = express.Router();
const ownerRouter = require('./owner/ownerRouter');
const userRouter = require('./user/userRouter');
const orderRouter = require('./order/orderRouter');
const authUserRouter = require('./auth/authUser');
const authOwnerRouter = require('./auth/authOwner');

apiRouter.use('/authUser/', authUserRouter);
apiRouter.use('/authOwner/', authOwnerRouter);
apiRouter.use('/orders/', orderRouter);
apiRouter.use('/owners/', ownerRouter);
apiRouter.use('/users/', userRouter);

module.exports = apiRouter;