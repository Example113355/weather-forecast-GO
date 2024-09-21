const WeatherCard = () => {
    return (
        <div className="weather-card">
            <div className="card-information">
                <h3>London (2023 - 06 - 09)</h3>
                <span>Temperature: 18.71C</span>
                <span>Wind: 4.31 M/S</span>
                <span>Humidity: 76%</span>
            </div>

            <div className="card-condition">
                <img src="https://cdn.weatherapi.com/weather/64x64/day/113.png" alt="" />
                <span>Partly Cloudy</span>
            </div>
        </div>
    )
}

export default WeatherCard
