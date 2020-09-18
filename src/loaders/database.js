const Sequelize = require('sequelize');


function connectToDB() {
    return new Promise((res, rej) => {
        const sequelize = new Sequelize('users', 'postgres', '', {
            host: 'localhost',
            dialect: 'postgres',
            port: 5432
        });

        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                res(sequelize);
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                rej('Connect to DB is failed');
            });
    });
}

export default connectToDB;
