
import { Op } from 'sequelize';
import { TEST_USERS } from '../config';
import { USER_MODEL } from '../models';

class Mapper {
    constructor(db) {
        this.db = db || null;
        this.users = null;
        this.db && this.createTables();
    }

    createTables() {
        this.users = this.db.define('user', USER_MODEL);

        this.users.sync().then(() => {
            this.users.findAndCountAll()
                .then(res => {
                    if (res.count > 3) {
                        return;
                    }
                    this.users.bulkCreate(TEST_USERS)
                        .then(() => {
                            console.log('Test users are added');
                        })
                        .catch((err) => {
                            console.log('Failed to add test userds', err);
                        });
                });
        });
    }
    // USER DB PART
    addUser(id, login, password, age) {
        const user = {
            login,
            password,
            age
        };
        id && (user.id = id);
        return this.users.create(user);
    }

    updateUser(id, login, password, age) {
        const newOptions = {};
        login && (newOptions.login = login);
        password && (newOptions.password = password);
        age && (newOptions.age = age);
        return this.users.update(newOptions, { where: { id } });
    }

    getUserById(id) {
        return this.users.findOne({ where: { id } });
    }

    deleteUser(id) {
        return this.users.destroy({ where: { id } });
    }

    getUsers(subStr, limit = 10) {
        const options = {
            limit
        };
        subStr && (options[Op.substring] = subStr);
        return this.users.findAll(options);
    }

    // GROUP DB PART

    getAllGroups() {

    }

    getGroupById(id) {

    }

    addGroup(group) {

    }

    updateGroup(id, options) {

    }

    deleteGroup(id) {
        
    }

    setDB(db) {
        this.db = db;
        this.db && this.createTables();
    }
}

const intsance = new Mapper();

export default intsance;

export { Mapper };
