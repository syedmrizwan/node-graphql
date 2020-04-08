const { gql } = require('apollo-server-express');

const agency_query = gql`
  extend type Query {
    author(id: ID!): Author
    authors: [Author!]!
  }
`
module.exports = agency_query