const { getAllOrders, getProductById } = require('./orders.model')

module.exports = {
  Query: {
    orders: () => {
      return getAllOrders()
    },
    ordersById: (_, args) => {
      console.log(args.id)
      return getProductById(args.id)
    },
  },
}
