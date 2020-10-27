import { TEST_GROUPS, TEST_USERS } from '../config';
import { GROUP_MODEL, USER_MODEL } from '../models';

class Mapper {
    constructor(db) {
        this.db = db || null;
        this.users = null;
        this.groups = null;
        this.usersGroups = null;
        this.db && this.createTables();
    }

    // PRIVATE METHODS
    createTables() {
        this.createUserTable();
        this.createGroupsTable();
        this.createUsersGroupsTable();

        this.users.belongsToMany(this.groups, { through: this.usersGroups });
        this.groups.belongsToMany(this.users, { through: this.usersGroups });

        this.db.sync().then(() => this.addTestData());
    }

    addTestData() {
        this.users.findAndCountAll()
            .then(res => {
                if (res.count > 3) {
                    return Promise.resolve();
                }
                this.users.bulkCreate(TEST_USERS)
                    .then(() => {
                        console.log('Test users are added');
                    })
                    .catch((err) => {
                        console.log('Failed to add test userds', err);
                    });
            })
            .then(() => {
                this.groups.findAndCountAll()
                    .then((res) => {
                        if (res.count > 1) {
                            return Promise.resolve();
                        }
                        this.groups.bulkCreate(TEST_GROUPS)
                            .then(() => {
                                console.log('Test users are added');
                            })
                            .catch((err) => {
                                console.log('Failed to add test userds', err);
                            });
                    });
            });
    }

    createUserTable() {
        this.users = this.db.define('user', USER_MODEL);
    }

    createGroupsTable() {
        this.groups = this.db.define('group', GROUP_MODEL);
    }

    createUsersGroupsTable() {
        this.usersGroups = this.db.define('users-groups', {});
    }
    // /////////////////// USER DB PART ////////////////////////////////
    addUser(options) {
        return this.users.create(options);
    }

    updateUser(id, options) {
        return this.users.update(options, { where: { id } });
    }

    getUserById(id) {
        return this.users.findOne({
            where: { id },
            include: this.groups
        });
    }

    getUserByOptions(options) {
        return this.users.findOne(options);
    }

    deleteUser(id) {
        return this.users.destroy({ where: { id } });
    }

    getUsers(options) {
        return this.users.findAll(options);
    }

    // /////////////////// GROUP DB PART ////////////////////////////////
    getAllGroups() {
        return this.groups.findAll({ include: this.users });
    }

    getGroupById(id) {
        return this.groups.findOne({ where: { id } });
    }

    addGroup(group) {
        return this.groups.create(group);
    }

    updateGroup(id, options) {
        return this.groups.update(options, { where: { id } });
    }

    deleteGroup(id) {
        return this.groups.destroy({ where: { id } });
    }

    // /////////////////// USERS-GROUPS DB PART //////////////////////////////////

    addUserToGroup(userId, groupId) {
        return this.users.find({ where: { id: userId } })
            .then(user => {
                return this.groups.find({ where: { id: groupId } })
                    .then(group => {
                        user.addGroup(group);
                    });
            });
    }

    removeUserFromGroup(userId, groupId) {
        return this.users.find({ where: { id: userId } })
            .then(user => {
                return this.groups.find({ where: { id: groupId } })
                    .then(group => {
                        user.removeGroup(group);
                    });
            });
    }

    // OTHER METHODS
    setDB(db) {
        this.db = db;
        this.db && this.createTables();
    }
}

const intsance = new Mapper();

export default intsance;

export { Mapper };
