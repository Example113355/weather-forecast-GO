const ForecastItem = () => {
    return (
        <div className="forecast-item">
            <div className="forecast-item--content">
                <span className="forecast-header">
                    (2023 - 06 - 09)
                </span>

                <img src="https://cdn.weatherapi.com/weather/64x64/day/113.png" alt="" />

                <span>Temp: 18.71C</span>
                <span>Wind: 4.31 M/S</span>
                <span>Humidity: 76%</span>
            </div>
        </div>
    );
}

export default ForecastItem;
