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
    reviews: [],
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

function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    price,
    description,
    reviews: [],
  }
  products.push(newProduct)
  return newProduct
}

function addNewProductReview(id, rating, comment) {
  const product = getProductById(id)

  if (product) {
    const newReview = {
      rating,
      comment,
    }
    console.log(product)
    product[0].reviews.push(newReview)

    return newReview
  }
}

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
  addNewProductReview,
}
