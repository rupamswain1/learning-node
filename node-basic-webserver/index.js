const http = require('http')

const PORT = 3000

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

const server = http.createServer((req, res) => {
  const params = req.url.split('/')
  if (params.length <= 2) {
    if (params[1] === 'name') {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          name: 'rupam',
        }),
      )
    } else if (params[1] === 'html') {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.write(`
            <html>
                <body>
                    <h1>Hello HTML!!</h1>
                </body>
            </html>
        `)
      res.end()
    } else if (params[1] === 'pets') {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(pets))
    } else {
      res.statusCode = 404
      res.end()
    }
  } else if (params.length === 3) {
    if (params[1] === 'pets') {
      if (params[2] <= pets.length - 1) {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(pets[params[2]]))
      } else {
        res.statusCode = 404
        res.end()
      }
    }
  }
})

server.listen(PORT, () => {
  console.log(`Listning on Port ${PORT}...`)
})
