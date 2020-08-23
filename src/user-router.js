import express from 'express';
import { ERRORS } from './constants';
import { createUser, updateUser, deleteUser, findUserById, getAutoSuggestUsers } from './usersDB';
import Joi from '@hapi/joi';
import { validateSchema } from './helpers';

const router = express.Router();
const userSchemaPost = Joi.object().keys({
    id: Joi.string(),
    login: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/).required(),
    age: Joi.number().integer().min(4).max(130).required()
});
const userSchemaPut = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/),
    age: Joi.number().integer().min(4).max(130)
});
const userSchemaList = Joi.object().keys({
    subStr: Joi.string().required(),
    limit: Joi.number().required()
});

router.post('/', validateSchema(userSchemaPost), async (req, res, next) => {
    try {
        const { id, login, password, age } = req.query;
        const result = await createUser(id, login, password, age);
        res.send(result);
    } catch (error) {
        next(error);
        return;
    }
});

router.get('/list', validateSchema(userSchemaList), (req, res, next) => {
    const  { subStr, limit } = req.query;
    if (!subStr) {
        next(ERRORS.THERE_IS_NO_LOGIN_SUBSTRING);
        return;
    }
    const users = getAutoSuggestUsers(subStr, limit);
    res.send(users);
});

router.route('/:id')
    .get(async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await findUserById(id);
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
            const result = await updateUser(id, login, password, age);
            res.send(result);
        } catch (error) {
            next(error);
            return;
        }
    })
    .delete(async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await deleteUser(id);
            res.send(result);
        } catch (error) {
            next(error);
            return;
        }
    });

export default router;
