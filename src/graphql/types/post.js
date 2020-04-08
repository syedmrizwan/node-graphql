const { gql } = require('apollo-server-express');

const post_type =gql`
type Post {
    id: ID!
    title: String
    content: String!
    authorId: ID!
    author: Author!
}
`
module.exports=post_type