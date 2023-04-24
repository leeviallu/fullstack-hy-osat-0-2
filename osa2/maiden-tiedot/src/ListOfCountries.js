import { useState } from "react";
import CountryPage from "./CountryPage";

const ListOfCountries = ({list}) => {
    const [showCountry, setShowCountry] = useState(false);
    const [countryData, setCountryData] = useState([])

    const handleClick = (country) => {
        setShowCountry(true)
        setCountryData(country)
    }
    return (
        <div>   
            {
                !showCountry 
                ?
                list.map(country => {
                    return (
                        <div key={country.name.common}>
                            <p>{country.name.common}</p>
                            <button onClick={() => handleClick(country)}>show</button>
                        </div>
                )})
                :
                <CountryPage country={countryData}/>

            }       
        </div>
    )
}

export default ListOfCountries;