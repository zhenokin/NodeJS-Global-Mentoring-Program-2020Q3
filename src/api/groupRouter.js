import { Router } from "express";
import { validateSchema } from "../helpers";
import { logger } from "../logger";
import { GROUP_SCHEMA } from "../models";
import { GroupService } from "../services";

const router = Router();
const moduleName = 'GroupRouter';

router.post('/', validateSchema(GROUP_SCHEMA.POST), async (req, res, next) => {
    try {
        logger.info(moduleName, 'receive POST request, query:', req.query);
        const { id, name, permissions } = req.query;
        const result = await GroupService.addGroup(id, name, permissions); //
        res.send(result);
    } catch (error) {
        logger.error(moduleName, 'can not handle POST request by reason:', error);
        next(error);
        return;
    }
});

router.get('/list', async (req, res, next) => {
    try {
        logger.info(moduleName, 'receive GET request for /list method, query:', req.query);
        const users = await GroupService.getAllGroups();
        res.send(users);
    } catch (error) {
        logger.error(moduleName, 'can not handle GET request for /list method by reason:', error);
        next(error);
        return;
    }
});

router.route('/:id')
    .get(validateSchema(GROUP_SCHEMA.GET), async (req, res, next) => {
        try {
            logger.info(moduleName, 'receive GET request for get group, params:', req.params);
            const { id } = req.params;
            const result = await GroupService.getGroupById(id);
            res.send(result);
        } catch (error) {
            logger.error(moduleName, 'can not handle GET request for get group by reason:', error);
            next(error);
            return;
        }
    })
    .put(validateSchema(GROUP_SCHEMA.PUT), async (req, res, next) => {
        try {
            logger.info(moduleName, 'receive PUT request for update group, params:', req.params);
            const { id } = req.params;
            const { name, permissions } = req.query;
            await GroupService.updateGroup(id, name, permissions);
            res.send('success');
        } catch (error) {
            logger.error(moduleName, 'can not handle PUT request for update group by reason:', error);
            next(error);
            return;
        }
    })
    .delete(async (req, res, next) => {
        try {
            logger.info(moduleName, 'receive DELETE request for group, params:', req.params);
            const { id } = req.params;
            await GroupService.deleteGroup(id);
            res.send('success');
        } catch (error) {
            logger.error(moduleName, 'can not handle DELETE request for group by reason:', error);
            next(error);
            return;
        }
    });

export default router;
