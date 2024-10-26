const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Usage: ')
  console.log('node mongo.js <password> - To display all entries in the phonebook')
  console.log('node mongo.js <password> <name> <number> - To add a new entry to the phonebook')
  process.exit(1)
}

const password = process.argv[2]
const url =`mongodb+srv://fullstack:${password}@phonebook.ubgzm.mongodb.net/personApp?retryWrites=true&w=majority&appName=phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person
    .save()
    .then(person => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
    .catch(error => {
      console.log('error saving person:', error.message)
      mongoose.connection.close()
    })
} else {
  Person
    .find({})
    .then(persons => {
      console.log('phonebook:')
      persons.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
    .catch(error => {
      console.log('error fetching persons:', error.message)
      mongoose.connection.close()
    })
}
