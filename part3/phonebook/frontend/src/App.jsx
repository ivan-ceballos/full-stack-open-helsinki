import { useEffect, useState } from 'react'
import personService from './services/persons'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({})

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
      .catch(() => displayNotification('Failed to get data from server', 'error'))
  }, [])

  const updatePerson = (updatedPerson) => {
    personService
      .update(updatedPerson.id, updatedPerson)
      .then((changedPerson) => {
        setPersons(persons.map(p => p.id !== updatedPerson.id ? p : changedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(() => {
        displayNotification(`Information of ${updatedPerson.name} has already been removed from server`, 'error')
        setPersons(persons.filter(p => p.id !== updatedPerson.id))
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    if (!newName || !newNumber) {
      displayNotification('Both name and number are required', 'error')
      return
    }

    const personFound = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()) 
 
    if (personFound) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson({ ...personFound, number: newNumber})
        displayNotification(`${personFound.name}'s number updated`, 'success')
      }
    }
      else {
        const person = {
          name: newName,
          number: newNumber,
          id: Date.now()
        } 

        personService
          .create(person)
          .then(person => {
            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')
            displayNotification(`Added ${person.name}`, 'success')
          })
          .catch((error) => displayNotification(error.response.data.error, 'error'))
      }

  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        displayNotification(`Removed ${person.name}`, 'error')
      })
      .catch(() => {
        displayNotification(`Information of ${person.name} has already been removed from server`, 'error')
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const displayNotification = (message, type) => {
    setMessage({text: message, type: type})
    setTimeout(() => {
      setMessage({})
    }, 5000);
  }

  const numbersToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification text={message.text} type={message.type}/>

      <Filter value={filter} handleFilterChange={handleFilterChange}/>
      

      <h3>add a new</h3>
      <PersonForm 
        onSubmit={addPerson} 
        name={newName} handleNameChange={handleNameChange}
        number={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={numbersToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App