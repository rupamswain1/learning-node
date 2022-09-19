const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHttp, graphqlHTTP } = require('express-graphql')

const schema = buildSchema(`
   type Query{
    products:[Product]
    orders:[Order]
   }

   type Product{
    id:ID!
    description:String!
    reviews:[Review]
    price:Float!
   }

   type Review{
    rating: Int!
    comment:String
   }

   type Order{
    date:String!
    subTotal:Float!
    items:[OrderItems]
   }

   type OrderItems{
    product:Product!
    quantity:Int!
   }
`)

const root = {
  products: [
    {
      id: '3060gc',
      description: '3060 graphic card',
      price: 35000,
      reviews: [
        {
          rating: 5,
          comment: 'good',
        },
        {
          rating: 2,
          comment: 'broken item recieved',
        },
      ],
    },
    {
      id: 'inti5',
      description: 'Intel i5',
      price: 36000,
    },
  ],
  orders: [
    {
      date: '01-01-2022',
      subTotal: 700000.0,
      items: [
        {
          product: {
            id: '3060gc',
            description: 'Asus 3060 gc',
            price: 80000,
          },
          quantity: 1,
        },
      ],
    },
  ],
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
