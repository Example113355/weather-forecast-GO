const ForecastItem = ({ date, temperature, wind, humidity, icon, condition }) => {
    return (
        <div className="forecast-item">
            <div className="forecast-item--content">
                <span className="forecast-header">
                    {date}
                </span>

                <img src={`https:${icon}`} alt="" />

                <span>{condition}</span>

                <span>Temp: {temperature}C</span>
                <span>Wind: {wind} M/S</span>
                <span>Humidity: {humidity}%</span>
            </div>
        </div>
    );
}

export default ForecastItem;
