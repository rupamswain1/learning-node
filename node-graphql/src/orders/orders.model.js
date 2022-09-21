const orders = [
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
]

function getAllOrders() {
  return orders
}

module.exports = {
  getAllOrders,
}
