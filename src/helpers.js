const errorResponse = schemaErrors => {
    const errors = schemaErrors.map(err => {
        const { path, message } = err;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
};

export const validateSchema = schema => (req, res, next) => {
    const data = Object.assign({}, req.params, req.query);
    const { error } = schema.validate(data, {
        abortEarly: false
    });

    if (error && error.isJoi) {
        res.status(400).json(errorResponse(error.details));
    } else {
        next();
        return;
    }
};
