import { useEffect, useState } from "react"
import axios from "axios"

const CountryPage = ({country}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const latitude = country.capitalInfo.latlng[0]
    const longitude = country.capitalInfo.latlng[1]
    const [temperature, setTemperature] = useState(null)
    const [iconUrl, setIconUrl] = useState(null)
    const [windSpeed, setWindSpeed] = useState(null)
    const [altIcon, setAltIcon] = useState(null)
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`
    
    useEffect(() => {
        axios
            .get(weatherUrl)
            .then(response => {
                setTemperature((response.data.main.temp - 272.15).toFixed(2) );
                setWindSpeed(response.data.wind.speed);
                setIconUrl(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
                setAltIcon(response.data.weather[0].description);
            })
    }, [weatherUrl])

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
            <h3>Weather in </h3>
            <p>temperature {temperature} Celcius</p>
            <img alt={altIcon} src={iconUrl} />
            <p>wind {windSpeed} m/s</p>
        </div>
    )
}

export default CountryPage