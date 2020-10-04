import { Op } from 'sequelize';
import Mapper from '../data-access';
import GroupService from './group.service';

class UserService {
    constructor() {
    }

    createUser(id, login, password, age) {
        const user = {
            login,
            password,
            age
        };
        id && (user.id = id);

        return Mapper.addUser(user);
    }

    updateUser(id, login, password, age) {
        const newOptions = {};
        login && (newOptions.login = login);
        password && (newOptions.password = password);
        age && (newOptions.age = age);
        return Mapper.updateUser(id, newOptions);
    }

    deleteUser(id) {
        return Mapper.deleteUser(id);
    }

    getUsers(subStr, limit = 10) {
        const options = {
            limit
        };
        subStr && (options[Op.substring] = subStr);
        return Mapper.getUsers(options);
    }

    getUserById(id) {
        return Mapper.getUserById(id);
    }

    addGroupToUser(userId, groupId) {
        return Mapper.db.transaction(() => {
            return this.getUserById(userId)
                .then(user => {
                    return GroupService.getGroupById(groupId)
                        .then(group => {
                            return user.addGroup(group);
                        });
                });
        });
    }

    deleteGroupFromUser(userId, groupId) {
        return Mapper.db.transaction(() => {
            return this.getUserById(userId)
                .then(user => {
                    return GroupService.getGroupById(groupId)
                        .then(group => {
                            return user.removeGroup(group);
                        });
                });
        });
    }
}

const instance = new UserService();

export default instance;
