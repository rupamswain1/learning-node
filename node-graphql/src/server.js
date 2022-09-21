const express = require('express')

const { graphqlHTTP } = require('express-graphql')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const path = require('path')

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))
const resolverArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'))
const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolverArray,
})

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
)

app.listen(3000, () => {
  console.log('Running GraphQL Server')
})
