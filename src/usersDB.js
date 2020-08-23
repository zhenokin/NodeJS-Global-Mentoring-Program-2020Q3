import { v4 as uuidv4 } from 'uuid';
import User from './user';
import { ERRORS } from './constants';

const usersList = [];

export const createUser = (id = uuidv4(), login, password = '', age) => {
    return new Promise((res, rej) => {
        if (usersList.find(u => u.id === id)) {
            rej(ERRORS.USER_ALREADY_EXIST);
        }

        const user = new User(id, login, password, age);
        usersList.push(user);
        res(user);
    });
};

export const updateUser = (id, login, password, age) => {
    return new Promise((res, rej) => {
        const user = usersList.find(u => u.id === id);
        if (!user) {
            rej(ERRORS.USER_NOT_FOUND);
        }

        login !== undefined && user.updateLogin(login);
        password !== undefined && user.updatePassword(password);
        age !== undefined && user.updateAge(age);
        res(user);
    });
};

export const deleteUser = id => {
    return Promise((res, rej) => {
        const user = usersList.find(u => u.id === id);
        if (!user) {
            rej(ERRORS.USER_NOT_FOUND);
        }

        user.deleteUser();
        res('Uset deletion successful');
    });
};

export const findUserById = id => {
    return new Promise((res, rej) => {
        const user = usersList.find(u => u.id === id);
        if (!user) {
            rej(ERRORS.USER_NOT_FOUND);
        }

        res(user);
    });
};

export const getAutoSuggestUsers = (loginSubstring, limit = 10) => {
    const users = usersList.reduce((list, user) => {
        if (list.length < limit || user.login.include(loginSubstring)) {
            list.push(user);
        }
        return list;
    }, [])
        .sort((a, b) => {
            if (a.login < b.login) {
                return -1;
            }
            return 1;
        });
    return users;
};
