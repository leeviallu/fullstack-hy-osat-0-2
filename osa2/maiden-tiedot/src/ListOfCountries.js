const ListOfCountries = ({list}) => {
    return (
        <div>   
            {
                list.map(country => {
                    return <p key={country.name.common}>{country.name.common}</p>
                  })
            }
        </div>
    )
}

export default ListOfCountries;