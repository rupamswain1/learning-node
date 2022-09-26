const orders = [
  {
    id: 'od1',
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
]

function getAllOrders() {
  return orders
}

function getProductById(id) {
  const fil = orders.filter((order) => {
    return order.id == id
  })
  console.log(fil)
  return fil
}

module.exports = {
  getAllOrders,
  getProductById,
}
