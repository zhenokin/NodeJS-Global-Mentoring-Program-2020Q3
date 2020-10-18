const winston = require('winston');
const path = require('path');

const winsonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({
            filename: path.join(`${process.cwd()}/logs`, 'info.log'),
            maxsize: 10000000,
            maxFiles: 5
        }),
        new winston.transports.Console()
    ]
});

export const logger = {
    info: (...args) => {
        winsonLogger.info(args.map(arg => JSON.stringify(arg)).join(' '));
    },
    error: (...args) => {
        winsonLogger.error(args.map(arg => JSON.stringify(arg)).join(' '));
    }
};
