const { gql } = require('apollo-server-express');

const mutation = gql`
    extend type Mutation {
        createAuthor(firstName: String, lastName: String, email: String): Response
    }
`

module.exports = mutation