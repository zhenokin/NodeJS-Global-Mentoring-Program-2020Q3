import Joi from '@hapi/joi';

const { DataTypes } = require('sequelize');

export const GROUP_MODEL = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    }
};

export const GROUP_SCHEMA = {
    POST: Joi.object().keys({
        id: Joi.string().guid({ version: 'uuidv4' }),
        name: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
    }),
    PUT: Joi.object().keys({
        id: Joi.string().guid({ version: 'uuidv4' }).required(),
        name: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
    }),
    GET:  Joi.object().keys({
        id: Joi.string().guid({ version: 'uuidv4' }).required()
    })
};
