
import Mapper from '../data-access';

class GroupService {
    getAllGroups() {
        return Mapper.getAllGroups();
    }

    getGroupById(id) {
        return Mapper.getGroupById(id);
    }

    addGroup(id, name, permissions = []) {
        const group = {
            name,
            permissions
        };
        id && (group.id = id);
        return Mapper.addGroup(group);
    }

    updateGroup(id, name, permissions) {
        const newOptions = {};
        name && (newOptions.name = name);
        permissions && (newOptions.permissions = permissions);
        return Mapper.updateGroup(id, newOptions);
    }

    deleteGroup(id) {
        return Mapper.deleteGroup(id);
    }
}

const instance = new GroupService();

export default instance;
