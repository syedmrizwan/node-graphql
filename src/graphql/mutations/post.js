const { gql } = require('apollo-server-express');

const mutation = gql`
    extend type Mutation {
        createPost(title: String, content:String!, authorId: ID!): Post!
        updatePost(id: ID!, title: String, content:String!): [Int!]!
        deletePost(id: ID!): Int!
    }
`

module.exports = mutation