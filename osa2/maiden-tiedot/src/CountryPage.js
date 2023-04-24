const CountryPage = ({country}) => {
    console.log(country)
    return (
        <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {   
                    Object.keys(country.languages).map((key, id) => {
                        return <li key={id}>{country.languages[key]}</li>
                    })
                }
            </ul>
            <img alt={country.flags.alt} src={country.flags.png} />
        </div>
    )
}

export default CountryPage