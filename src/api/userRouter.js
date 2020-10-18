import express from 'express';
import Joi from '@hapi/joi';
import { validateSchema } from '../helpers';
import { UserService } from '../services';
import { logger } from '../logger';

const moduleName = '[UserRouter]';

const router = express.Router();
const userSchemaPost = Joi.object().keys({
    id: Joi.string().guid({ version: 'uuidv4' }),
    login: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/).required(),
    age: Joi.number().integer().min(4).max(130).required()
});
const userSchemaPut = Joi.object().keys({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
    login: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/),
    age: Joi.number().integer().min(4).max(130)
});
const userSchemaGetUser = Joi.object().keys({
    id: Joi.string().guid({ version: 'uuidv4' }).required()
});
const userSchemaList = Joi.object().keys({
    subStr: Joi.string(),
    limit: Joi.number()
});

router.post('/', validateSchema(userSchemaPost), async (req, res, next) => {
    try {
        logger.info(moduleName, 'receive POST request, query:', req.query);
        const { id, login, password, age } = req.query;
        const result = await UserService.addUser(id, login, password, age);
        res.send(result);
    } catch (error) {
        logger.error(moduleName, 'can not handle POST request by reason:', error);
        next(error);
        return;
    }
});

router.get('/list', validateSchema(userSchemaList), async (req, res, next) => {
    try {
        logger.info(moduleName, 'receive GET request for /list method, query:', req.query);
        const  { subStr, limit } = req.query;
        const users = await UserService.getUsers(subStr, limit);
        res.send(users);
    } catch (error) {
        logger.error(moduleName, 'can not handle GET request for /list method by reason:', error);
        next(error);
        return;
    }
});

router.post('/add-group', async (req, res, next) => {
    try {
        logger.info(moduleName, 'receive GET request for /add-group method, query:', req.query);
        const  { userId, groupId } = req.query;
        await UserService.addGroupToUser(userId, groupId);
        res.send('success');
    } catch (error) {
        logger.error(moduleName, 'can not handle GET request for /add-group method by reason:', error);
        next(error);
        return;
    }
});

router.route('/:id')
    .get(validateSchema(userSchemaGetUser), async (req, res, next) => {
        try {
            logger.info(moduleName, 'receive GET request for get user, params:', req.params);
            const { id } = req.params;
            const result = await UserService.getUserById(id);
            res.send(result);
        } catch (error) {
            logger.error(moduleName, 'can not handle GET request for get user by reason:', error);
            next(error);
            return;
        }
    })
    .put(validateSchema(userSchemaPut), async (req, res, next) => {
        try {
            logger.info(moduleName, 'receive PUT request for update user, params:', req.params);
            const { id } = req.params;
            const { login, password, age } = req.query;
            await UserService.updateUser(id, login, password, age);
            res.send('success');
        } catch (error) {
            logger.error(moduleName, 'can not handle PUT request for update user by reason:', error);
            next(error);
            return;
        }
    })
    .delete(async (req, res, next) => {
        try {
            logger.info(moduleName, 'receive DELETE request for user, params:', req.params);
            const { id } = req.params;
            await UserService.deleteUser(id);
            res.send('success');
        } catch (error) {
            logger.error(moduleName, 'can not handle DELETE request for user by reason:', error);
            next(error);
            return;
        }
    });

export default router;
