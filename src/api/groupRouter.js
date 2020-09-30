import { Router } from "express";

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { id, name, permissions } = req.query;
        const result = 3; //
        res.send(result);
    } catch (error) {
        next(error);
        return;
    }
});

router.get('/list', /* validateSchema(userSchemaList),*/ async (req, res, next) => {
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
    .get(/* validateSchema(userSchemaGetUser),*/ async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await Mapper.getUserById(id);
            res.send(result);
        } catch (error) {
            next(error);
            return;
        }
    })
    .put(/* validateSchema(userSchemaPut),*/ async (req, res, next) => {
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
