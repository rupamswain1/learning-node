const { getAllOrders, getProductById } = require('./orders.model')

module.exports = {
  Query: {
    orders: () => {
      return getAllOrders()
    },
    ordersById: (_, args) => {
      
      return getProductById(args.id)
    },
  },
}
