const { merge } = require("lodash");
const { makeExecutableSchema } = require("graphql-tools");
const fs = require('fs');
const path = require('path');
const formatError = require(`${process.cwd()}/src/format_error`);

let typeDefs = []

const query = `
type Query {
    _empty: String
}
`
const mutation = `
type Mutation {
    _empty: String
}
`

const subscription = `
type Subscription {
  _empty: String
}
`

/**
 * Load all types from types folder into typeDefs array
 */
const typeDir = path.join(__dirname, 'types')
fs
  .readdirSync(typeDir)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    typeDefs.push(require((path.join(typeDir, file))));
  });


/**
 * Load all queries from queries folder into typeDefs array
 */
typeDefs.push(query)
const queriesDir = path.join(__dirname, 'queries')
fs
  .readdirSync(queriesDir)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    typeDefs.push(require((path.join(queriesDir, file))))
  });


/**
 * Load all mutations from mutations folder into typeDefs array
 */
typeDefs.push(mutation)
const mutationsDir = path.join(__dirname, 'mutations')
fs
  .readdirSync(mutationsDir)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    typeDefs.push(require((path.join(mutationsDir, file))))
  });


// /**
//  * Load all subscriptions from subscriptions folder into typeDefs array
//  */
// typeDefs.push(subscription)
// const subscriptionsDir = path.join(__dirname, 'subscriptions')
// fs
//   .readdirSync(subscriptionsDir)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     typeDefs.push(require((path.join(subscriptionsDir, file))))
//   });

/**
 * load all resolvers from resolvers folder into resolverObj array
 */
let resolverObjs = []
const resolversDir = path.join(__dirname, 'resolvers')
fs
  .readdirSync(resolversDir)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    resolverObjs.push(require((path.join(resolversDir, file))))
  });

const resolvers = merge(...resolverObjs)

Object.keys(resolvers).forEach(resolver => {
  if (resolvers[resolver].constructor.name === "GraphQLScalarType")
    return
  Object.keys(resolvers[resolver]).forEach(each => {
    if (typeof resolvers[resolver][each] === 'function')
      resolvers[resolver][each] = wrapper(resolvers[resolver][each])
  })
})

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

function wrapper(f) {
  return async function () {
    try {
      return await f.apply(this, arguments);
    } catch (error) {
      return formatError(error);
    }
  }
}

module.exports = schema