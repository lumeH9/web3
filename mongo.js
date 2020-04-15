const mongoose = require('mongoose')
//salis sensuroitu

const url = 'mongodb+srv://fullstack:jdho3g2KPssWxZ50s@cluster0-krrwl.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(url)
//mongodb+srv://stone:<password>@strangestones-pmhal.mongodb.net/test?retryWrites=true&w=majority
//const url = 'mongodb+srv://stone:jL9v528vWXuV8Sxw@strangestones-shard-00-00-pmhal.mongodb.net/persons-database'
const Person = mongoose.model('Person', {
  name: String,
  number: String,
})
//var myArgs = process.argv.slice(2);
//console.log('myArgs: ', myArgs);


  if(!process.argv[2]){
    console.log('puhelinluettelo:')
  Person
  .find({})
  .then(persons => {
    persons.forEach(person => {
      console.log(person.name + " " + person.number)
    })
    mongoose.connection.close()
  })
}
  else{
    const person = new Person({
      name: process.argv[2],
      number: process.argv[3]
    })
    
    person
      .save()
      .then(response => {
        console.log('note saved!')
        mongoose.connection.close()
      })
    }