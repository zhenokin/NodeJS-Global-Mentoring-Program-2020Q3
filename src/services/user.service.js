import { Op } from 'sequelize';
import Mapper from '../data-access';
import { logger } from '../logger';
import GroupService from './group.service';

const moduleName = '[UserService]';

class UserService {
    createUser(id, login, password, age) {
        logger.info(moduleName, 'createUser(),', 'args:', { id, login, password, age });
        const user = {
            login,
            password,
            age
        };
        id && (user.id = id);

        return Mapper.addUser(user);
    }

    updateUser(id, login, password, age) {
        logger.info(moduleName, 'updateUser(),', 'args:',  { id, login, password, age });
        const newOptions = {};
        login && (newOptions.login = login);
        password && (newOptions.password = password);
        age && (newOptions.age = age);
        return Mapper.updateUser(id, newOptions);
    }

    deleteUser(id) {
        logger.info(moduleName, 'deleteUser(),', 'args:',  { id });
        return Mapper.deleteUser(id);
    }

    getUsers(subStr, limit = 10) {
        logger.info(moduleName, 'getUsers(),', 'args:', { subStr, limit });
        const options = {
            limit
        };
        subStr && (options[Op.substring] = subStr);
        return Mapper.getUsers(options);
    }

    getUserById(id) {
        logger.info(moduleName, 'getUserById(),', 'args:', { id });
        return Mapper.getUserById(id);
    }

    addGroupToUser(userId, groupId) {
        logger.info(moduleName, 'getUserById(),', 'args:', { userId, groupId });
        return Mapper.db.transaction(() => {
            return this.getUserById(userId)
                .then(user => {
                    return GroupService.getGroupById(groupId)
                        .then(group => {
                            logger.info(moduleName, 'getUserById(),', 'add user:', user, 'to group:', group);
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

    getUserForAuth(login, password) {
        logger.info(moduleName, 'getUserForAuth(),', 'args:', { login, password });
        const options = {
            where: {
                login,
                password
            }
        };
        return Mapper.getUserByOptions(options);
    }
}

const instance = new UserService();

export default instance;
