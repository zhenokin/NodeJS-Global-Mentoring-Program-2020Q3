const { Router } = require('express');
import userRouter from './userRouter';

export default () => {
    const app = Router();
    app.use('/users', userRouter);
    return app;
};
