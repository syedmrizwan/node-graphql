const { gql } = require('apollo-server-express');

const response_type =gql`
type Response {
    code: Int!
    success: Boolean!
    message: String
}
`
module.exports=response_type