const { gql } = require('apollo-server-express');

const agency_query = gql`
  extend type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }
`
module.exports = agency_query