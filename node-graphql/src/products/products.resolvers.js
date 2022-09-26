const {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
  addNewProductReview,
} = require('./products.model')

module.exports = {
  Query: {
    products: () => {
      return getAllProducts()
    },
    productsByPrice: (_, args) => {
      return getProductsByPrice(args.minPrice, args.maxPrice)
    },
    productsById: (_, args) => {
      return getProductById(args.id)
    },
  },
  Mutation: {
    addNewProduct: (_, args) => {
      return addNewProduct(args.id, args.description, args.price)
    },
    addNewProductReview: (_, args) => {
      return addNewProductReview(args.id, args.rating, args.comment)
    },
  },
}
