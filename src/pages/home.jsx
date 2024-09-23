import React, { useState, useEffect } from 'react';
import Search from "../components/search"
import Button from "../components/button"
import WeatherCard from "../components/weather_card"
import ForecastItem from "../components/forecast_item"
import Separator from "../components/separator"
import EmailConfirmModal from '../components/email_confirmation';
import axios from 'axios';

const HomePage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');
    const [location, setLocation] = useState("vietnam");
    const [data, setData] = useState(null)
    const [forecastItems, setForecastItems] = useState(4)

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://weather-forecast-go-be.vercel.app/api/weather/${location}`)
            if(res.data.error_code) {
                alert(res.data.message)
                return
            }
            setData(res.data)
        }
        getData();
    }, [location])

    useEffect(() => {
        const forecastList = document.querySelector('.forecast-list');
        if (forecastList) {
            forecastList.scrollLeft = forecastList.scrollWidth;
        }
    }, [forecastItems]);

    const showModal = (type) => {
        setModalType(type);
        setIsModalVisible(true);
    }

    const handleClose = () => {
        setIsModalVisible(false);
    }

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`${latitude},${longitude}`);
                setForecastItems(4);
            },
            (error) => {
                alert(error.message);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    return (
        <div className="home">
            <div className="home-search">
                <span className="home-search--title">Enter a City or a Country Name</span>
                <Search setLocation={setLocation} />

                <div className="">
                    <Button onClick={getCurrentLocation} content="Use current location" isActive={false} />
                </div>

                <Separator content="Register" />

                <div className="">
                    <Button onClick={() => showModal('receive')} content="Receive daily information" isActive={true} />
                    <Button onClick={() => showModal('stop')} content="Stop receiving daily information" isActive={false} />
                </div>
            </div>
            <div className="home-content">
                {data ? (
                    <WeatherCard currentData={data} />
                ) : (
                    <div>Loading...</div>
                )}

                <div className="forecast-content">
                    <span className="forecast-content--header">Weather Forecast</span>

                    <div className="forecast-list">
                        {data ? (
                            data.forecast.forecastday.slice(0, forecastItems).map((item, index) => (
                                <ForecastItem 
                                    key={index}  
                                    date = {item.date}
                                    temperature = {item.day.avgtemp_c}
                                    wind = {item.day.maxwind_mph}
                                    humidity = {item.day.avghumidity}
                                    icon = {item.day.condition.icon}
                                    condition = {item.day.condition.text}
                                />
                            ))
                        ): (
                            <div>Loading...</div>
                        )}
                    </div>

                    {forecastItems < data?.forecast.forecastday.length && (
                        <button className="forecast-next" onClick={() => setForecastItems(forecastItems + 1)}>
                            &gt;
                        </button>
                    )}
                </div>
            </div>

            <EmailConfirmModal visible={isModalVisible} onClose={handleClose} type={modalType} />
        </div>
    )
}

export default HomePage
