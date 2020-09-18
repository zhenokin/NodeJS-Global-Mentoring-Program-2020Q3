import express from 'express';
import Joi from '@hapi/joi';
import { validateSchema } from '../helpers';
import Mapper from '../data-access';

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
        const { id, login, password, age } = req.query;
        console.log('hello');
        const result = await Mapper.addUser(id, login, password, age);
        res.send(result);
    } catch (error) {
        next(error);
        return;
    }
});

router.get('/list', validateSchema(userSchemaList), async (req, res, next) => {
    try {
        const  { subStr, limit } = req.query;
        const users = await Mapper.getUsers(subStr, limit);
        res.send(users);
    } catch (error) {
        next(error);
        return;
    }
});

router.route('/:id')
    .get(validateSchema(userSchemaGetUser), async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await Mapper.getUserById(id);
            res.send(result);
        } catch (error) {
            next(error);
            return;
        }
    })
    .put(validateSchema(userSchemaPut), async (req, res, next) => {
        try {
            const { id } = req.params;
            const { login, password, age } = req.query;
            await Mapper.updateUser(id, login, password, age);
            res.send('success');
        } catch (error) {
            next(error);
            return;
        }
    })
    .delete(async (req, res, next) => {
        try {
            const { id } = req.params;
            await Mapper.deleteUser(id);
            res.send('success');
        } catch (error) {
            next(error);
            return;
        }
    });

export default router;
