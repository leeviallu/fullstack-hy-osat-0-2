import { useState, useEffect } from 'react';
import personServices from './services/persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [shownPersons, setShownPersons] = useState([]);

  useEffect(() => {
    personServices
      .getAll()
      .then(response => {
        setPersons(response.data);
      })}, [persons, setPersons])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    let personIsUnique = true;
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    persons.forEach(person => {
      if (newNumber === person.number) {
        window.alert(`${personObject.number} is already added to phonebook`);
        personIsUnique = false;
      } else if (newName === person.name && newNumber !== person.number) {
          personIsUnique = false;
          if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
            personServices
                .update(person.id, personObject)
            window.location.reload()
          }
    }});

    if(personIsUnique) {
      personServices
        .create(personObject)
        .then(response => {
          console.log('post' ,response)
          setPersons(persons.concat(personObject));
        })
    }
    setNewName('')
    setNewNumber('')
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