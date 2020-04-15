


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = (request, response, next) => {
  console.log('Method:',request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(express.static('build'))

app.use(logger)
app.use(bodyParser.json())
app.use(cors())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()

  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})
const generateId = (min, max) => {

  return getRandomInt(5, 1000000)
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const name = body.name

  if (name === undefined) {
    return response.json({ error: 'name missing' })
  }
  if (body.number === undefined) {
    return response.json({ error: 'number missing' })
  }
  const person = persons.find(person => person.name === name)
  console.log(person)
  if (person) {
    return response.json({ error: 'name must be unique' })
  }
  const note = {
    name: body.name,
    id: generateId()
  }
  persons = persons.concat(note)
  response.json(note)
})

const error = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(error)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

