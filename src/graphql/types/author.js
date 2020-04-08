const { gql } = require('apollo-server-express');

const type =gql`
type Author {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    posts: [Post!]!
}
`
module.exports = type