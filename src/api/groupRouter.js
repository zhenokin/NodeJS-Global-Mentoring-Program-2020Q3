import { Router } from "express";
import { validateSchema } from "../helpers";
import { GROUP_SCHEMA } from "../models";
import { GroupService } from "../services";

const router = Router();

router.post('/', validateSchema(GROUP_SCHEMA.POST), async (req, res, next) => {
    try {
        const { id, name, permissions } = req.query;
        const result = await GroupService.addGroup(id, name, permissions); //
        res.send(result);
    } catch (error) {
        next(error);
        return;
    }
});

router.get('/list', async (req, res, next) => {
    try {
        const users = await GroupService.getAllGroups();
        res.send(users);
    } catch (error) {
        next(error);
        return;
    }
});

router.route('/:id')
    .get(validateSchema(GROUP_SCHEMA.GET), async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await GroupService.getGroupById(id);
            res.send(result);
        } catch (error) {
            next(error);
            return;
        }
    })
    .put(validateSchema(GROUP_SCHEMA.PUT), async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, permissions } = req.query;
            await GroupService.updateGroup(id, name, permissions);
            res.send('success');
        } catch (error) {
            next(error);
            return;
        }
    })
    .delete(async (req, res, next) => {
        try {
            const { id } = req.params;
            await GroupService.deleteGroup(id);
            res.send('success');
        } catch (error) {
            next(error);
            return;
        }
    });

export default router;
