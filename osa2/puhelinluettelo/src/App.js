import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [shownPersons, setShownPersons] = useState([]);

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
    })}, [])
    

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