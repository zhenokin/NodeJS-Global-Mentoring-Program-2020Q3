const DB_CONFIG = {
    url: 'postgres://sineeizx:czgEIMDjf9T1XQzQE3x7C-hPGIUlJEXM@balarama.db.elephantsql.com:5432/sineeizx'
};

const TEST_USERS = [
    { login: 'First',  password: 'first1', age: 11 },
    { login: 'Second',  password: 'second1', age: 12 },
    { login: 'Third',  password: 'third1', age: 13 }
];

const TEST_GROUPS = [
    { name: 'school' },
    { name: 'work' }
];

export {
    DB_CONFIG,
    TEST_USERS,
    TEST_GROUPS
};
