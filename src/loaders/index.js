const routes = require('../api').default();
const DB = require('./database').default;
const MapperInstance = require('../data-access').default;

export default async (app) => {
    try {
        app.use('/api', routes);

        const sequelize = await DB();
        MapperInstance.setDB(sequelize);
    } catch (error) {
        console.error('Failed to stast app by reason', error);
    }
};
