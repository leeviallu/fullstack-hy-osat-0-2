import personServices from './services/persons';

const Persons = ({persons}) => {
    const deletePerson = (id) => {
        persons.forEach(person => {
            if (person.id === id) {
                console.log(person)
                if(window.confirm(`Delete ${person.name}?`)) {
                    personServices
                        .remove(id)
                    window.location.reload()
                }
            }
        })
    }
    return (
        <div>
            {
                persons.map(person => {
                return (
                    <div key={person.name}>
                        {person.name} {person.number}
                        <button key={person.id} onClick={() => deletePerson(person.id)}>delete</button>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Persons;