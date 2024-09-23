const WeatherCard = ({ currentData }) => {
    return (
        <div className="weather-card">
            <div className="card-information">
                <h3>{`${currentData.location.name} (${currentData.current.last_updated})`}</h3>
                <span>Temperature: {currentData.current.temp_c}C</span>
                <span>Wind: {currentData.current.wind_mph} M/H</span>
                <span>Humidity: {currentData.current.humidity}%</span>
            </div>

            <div className="card-condition">
                <img src={`https:${currentData.current.condition.icon}`} alt="" />
                <span>{currentData.current.condition.text}</span>
            </div>
        </div>
    )
}

export default WeatherCard
