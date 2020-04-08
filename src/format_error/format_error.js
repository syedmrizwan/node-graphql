const logger = require(`${process.cwd()}/src/logger`);
const { generateResponse } = require(`${process.cwd()}/src/utils/utils.js`)
const { ApolloError } = require('apollo-server-express');

module.exports = (error) => {

    if(error && error.toString().indexOf('SequelizeUniqueConstraintError') > -1) {
        return generateResponse(409, false, error.message);
    }

    if(error && error.toString().indexOf('SequelizeValidationError') > -1) {
        return generateResponse(400, false, error.message);
    }

    logger.error(error.stack);

    if(process.env.NODE_ENV !== 'production') {
        throw error;
    }
    throw new ApolloError("Some error happened in the server", 500);
}

