import { Router } from 'express';
import { logger } from '../logger';
import { UserService } from '../services';
import jwt from 'jsonwebtoken';

const router = Router();

export default router.post('/', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    UserService.getUserForAuth(login, password).then((data) => {
        if (data && data.dataValues) {
            const payload = { 'sub': data.dataValues.id, 'isDeleted': data.dataValues.isDeleted };
            const token = jwt.sign(payload, 'secret', { expiresIn: 10000 });
            res.send(token);
            logger.info(`Returned token: ${token}`);
        } else {
            logger.error('User not exist');
            res.status(403).send();
        }
    }).catch((err) => {
        logger.error(`Failed to login. See the log: ${err}`);
    });
});
