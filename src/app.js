const express = require('express');
const { logger } = require('./logger');
const app = express();
const port = 3000;

function startServer() {
    logger.info('[App]:', 'run server');
    app.get('/', (req, res) => res.send('Hello World!'));
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));

    app.use((error, req, res) => {
        logger.error(`Internal Server Error: ${error}`);
        res.status(500).send('Internal Server Error');
    });

    require('./loaders').default(app);
}

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception thrown:', error);
});

process.on('unhandledRejection', (error) => {
    logger.error('Unhandled Rejection at Promise:', error);
});

startServer();
