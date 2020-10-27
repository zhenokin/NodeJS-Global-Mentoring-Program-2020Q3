import jwt from 'jsonwebtoken';
import { logger } from '../logger';


function authenticateToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token === null) {
        logger.error('Anauthorised');
        return res.sendStatus(401);  // if there isn't any token
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            logger.error(err);
            return res.sendStatus(403); // if broken token
        }
        req.login = decoded.login;
        req.password = decoded.password;
        next();
    });
}

export default authenticateToken;
