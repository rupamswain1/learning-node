const express = require('express')
const app = express()

const pets = [
  {
    id: 1,
    animal: 'Dog',
  },
  {
    id: 2,
    animal: 'Cat',
  },
  {
    id: 3,
    animal: 'Bird',
  },
]

app.get('/pets', (req, res) => {
  res.status(200).json(pets)
})

app.get('/pets/:petId', (req, res) => {
  const { petId } = req.params
  const pet = pets[petId]
  if (pet) {
    res.status(200).json(pet)
  } else {
    res.status(400).json({ error: 'Pet is not found' })
  }
})

app.listen(3000, () => {
  console.log('listing on port 3000')
})
