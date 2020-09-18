const DB_CONFIG = {
    dbName: 'users',
    userName: 'postgres',
    password: '',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
};

const TEST_USERS = [
    { login: 'First',  password: 'first1', age: 11 },
    { login: 'Second',  password: 'second1', age: 12 },
    { login: 'Third',  password: 'third1', age: 13 }
];

export {
    DB_CONFIG,
    TEST_USERS
};
