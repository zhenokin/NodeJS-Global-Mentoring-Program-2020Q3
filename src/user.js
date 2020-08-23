export default class User {
    constructor(id, login, password, age) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = false;
    }

    updateLogin(login) {
        this.login = login;
    }

    updatePassword(password) {
        this.password = password;
    }

    updateAge(age) {
        this.age = age;
    }

    delete() {
        this.isDeleted = true;
    }
}
