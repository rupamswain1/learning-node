const { pets } = require('../model/pets.model')

function postPet(req, res) {
  const { animal } = req.body
  if (animal) {
    pets.push({ id: pets.length + 1, animal })
    res.status(201)
    return res.json(pets)
  } else {
    res.status(401).json({ error: 'data not available' })
  }
}

module.exports = { postPet }
