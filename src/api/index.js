const { Router } = require('express');
import userRouter from './userRouter';
import groupRouter from './groupRouter';
import loginRouter from './loginRouter';

export default () => {
    const app = Router();
    app.use('/users', userRouter);
    app.use('/groups', groupRouter);
    app.use('/login', loginRouter);
    return app;
};
