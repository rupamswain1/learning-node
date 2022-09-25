const products = [
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
]

function getAllProducts() {
  return products
}

function getProductsByPrice(min, max) {
  return products.filter((product) => {
    return product.price >= min && product.price <= max
  })
}

function getProductById(id) {
  return products.filter((product) => {
    return product.id === id
  })
}

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
}
