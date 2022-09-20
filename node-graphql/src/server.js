const express = require('express')

const { graphqlHTTP } = require('express-graphql')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const path = require('path')

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: {
    Query: {
      products: async (parent) => {
        console.log('getting paroduct')
        const products = Promise.resolve(parent.products)
        return products
      },
      orders: async (parent) => {
        console.log('getting orders')
        const orders = Promise.resolve(parent.orders)
        return orders
      },
    },
  },
})

const root = {
  products: require('./products/products.model'),
  orders: require('./orders/orders.model'),
}

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
)

app.listen(3000, () => {
  console.log('Running GraphQL Server')
})
