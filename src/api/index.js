const { Router } = require('express');
import userRouter from './userRouter';
import groupRouter from './groupRouter';

export default () => {
    const app = Router();
    app.use('/users', userRouter);
    app.use('/groups', groupRouter);
    return app;
};
