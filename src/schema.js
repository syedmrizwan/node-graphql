export default `
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    posts: [Post!]!
  }
  type Post {
    id: ID!
    title: String
    content: String!
    authorId: ID!
    author: Author!
  }
  type Response {
    code: Int!
    success: Boolean!
    message: String
}
  type Error {
    path: String!
    message: String!
  }
  type Query {
    posts: [Post!]!
    post(id: ID!): Post
    author(id: ID!): Author
    authors: [Author!]!
  }
  type Mutation {
    createAuthor(firstName: String, lastName: String, email: String): Response
    createPost(title: String, content:String!, authorId: ID!): Post!
    updatePost(id: ID!, title: String, content:String!): [Int!]!
    deletePost(id: ID!): Int!
  }
`;