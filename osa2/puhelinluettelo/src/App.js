import { useState } from 'react'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [shownPersons, setShownPersons] = useState([]);


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {
    let personIsUnique = true;
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    persons.forEach(person => {
      if (newName === person.name || newNumber === person.number) {
        window.alert(`${nameObject.name} or ${nameObject.number} is already added to phonebook`);
        personIsUnique = false;
      }
    })
    if(personIsUnique) {
      setPersons(persons.concat(nameObject));
      setShownPersons(persons.concat(nameObject));
    }
    setNewNumber('')
    setNewName('')
  }

  const namesToShow = (event) => {
    const filteredPersons = persons
      .filter(x => {
        return x.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
              x.number.includes(event.target.value)
      })
    setShownPersons(filteredPersons)
  }

  const formProps = {persons, addPerson, newName, handleNameChange, newNumber, handleNumberChange}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter event={namesToShow} />
      <h3>add a new</h3>
      <PersonForm content={formProps} />
      <h3>Numbers</h3>
      <Persons persons={shownPersons} />
    </div>
  )

}

export default App