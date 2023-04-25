import { useState, useEffect } from 'react';
import personServices from './services/persons';
import Notification from './Notification';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Person from './Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [shownPersons, setShownPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [isPositive, setIsPositive] = useState('positive');

  useEffect(() => {
    personServices
      .getAll()
      .then(response => {
        setPersons(response.data);
      })}, [])


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
                .then(
                  setMessage(
                    `Number for ${person.name} has been changed`
                  ),
                  setTimeout(() => {
                    setMessage(null)
                  }, 5000)
                )
                .catch(error => {
                  console.log(person.id, personObject)
                  setIsPositive(null)
                  setMessage(`${person.name} has already been deleted from server`,)
                  
                  setTimeout(() => {
                    setMessage(null)
                    setIsPositive('positive')
                  }, 5000)
                })
            
            
          }
    }});

    if(personIsUnique) {
      personServices
        .create(personObject)
        .then(response => {
          console.log('post' ,response)
          setPersons(persons.concat(personObject));
        })
        .then(
          setMessage(
            `Added ${personObject.name}`
          ),
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        )
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


  const deletePerson = (id) => {
    persons.forEach(person => {
        if (person.id === id) {
            console.log(person)
            if(window.confirm(`Delete ${person.name}?`)) {
                personServices
                    .remove(id)
                    .then(
                      setIsPositive(null),
                      setMessage(
                        `${person.name} has been deleted`
                      ),
                      setTimeout(() => {
                        setMessage(null)
                        setIsPositive('positive')
                      }, 5000)
                    )
            }
        }
    })
  }
  const formProps = {persons, addPerson, newName, handleNameChange, newNumber, handleNumberChange}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} positive={isPositive} />
      <Filter event={namesToShow} />
      <h3>add a new</h3>
      <PersonForm content={formProps} />
      <h3>Numbers</h3>
      {
        shownPersons.map(person => {
          return (
            <div key={person.name}>
              <Person person={person} />
              <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>
            )
        })
      }
    </div>
  )

}

export default App