const { pets } = require('../model/pets.model')

function getPets(req, res) {
  res.status(200).json(pets)
}

function getPetById(req, res) {
  const { petId } = req.params
  console.log('in endpoint /pets/:' + petId)
  console.log(pets)
  const pet = pets[petId]
  if (pet) {
    res.status(200).json(pet)
  } else {
    res.status(400).json({ error: 'Pet is not found' })
  }
}

module.exports = { getPets, getPetById }
