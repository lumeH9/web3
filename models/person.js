const mongoose = require('mongoose')

const url = 'mongodb+srv://fullstack:jdho3g2KPssWxZ50s@cluster0-krrwl.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person