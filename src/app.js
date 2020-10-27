const express = require('express');
const cors = require('cors');
const { logger } = require('./logger');
const { default: authenticateToken } = require('./services/auth');
const app = express();
const port = 3000;

function startServer() {
    logger.info('[App]:', 'run server');

    const corsOptions = {
        origin: 'http://localhost:8080',
        optionsSuccessStatus: 204
    };

    app.use(express.json());
    app.get('/', (req, res) => res.send('Hello World!'));
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));

    app.use(cors(corsOptions));
    app.use(/^\/(?!.*login).*/, authenticateToken);

    app.use((error, req, res, next) => {
        logger.error(`Internal Server Error: ${error}`);
        console.log(res);
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
