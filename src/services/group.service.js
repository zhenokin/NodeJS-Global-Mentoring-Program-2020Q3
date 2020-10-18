
import Mapper from '../data-access';
import { logger } from '../logger';

const moduleName = '[GroupService]';

class GroupService {
    getAllGroups() {
        logger.info(moduleName, 'getAllGroups()');
        return Mapper.getAllGroups();
    }

    getGroupById(id) {
        logger.info(moduleName, 'getGroupById()', 'args:', { id });
        return Mapper.getGroupById(id);
    }

    addGroup(id, name, permissions = []) {
        logger.info(moduleName, 'addGroup()', 'args:', { id, name, permissions });
        const group = {
            name,
            permissions
        };
        id && (group.id = id);
        return Mapper.addGroup(group);
    }

    updateGroup(id, name, permissions) {
        logger.info(moduleName, 'updateGroup()', 'args:', { id, name, permissions });
        const newOptions = {};
        name && (newOptions.name = name);
        permissions && (newOptions.permissions = permissions);
        return Mapper.updateGroup(id, newOptions);
    }

    deleteGroup(id) {
        logger.info(moduleName, 'deleteGroup()', 'args:', { id });
        return Mapper.deleteGroup(id);
    }
}

const instance = new GroupService();

export default instance;
