import React, { useState } from 'react';
import Search from "../components/search"
import Button from "../components/button"
import WeatherCard from "../components/weather_card"
import ForecastItem from "../components/forecast_item"
import Separator from "../components/separator"
import EmailConfirmModal from '../components/email_confirmation';

const HomePage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');

    const showModal = (type) => {
        setModalType(type);
        setIsModalVisible(true);
    }

    const handleClose = () => {
        setIsModalVisible(false);
    }

    return (
        <div className="home">
            <div className="home-search">
                <span className="home-search--title">Enter a City or a Country Name</span>
                <Search />

                <div className="">
                    <Button onClick={() => {alert("clicked")}} content="Use current location" isActive={false} />
                </div>

                <Separator content="Register" />

                <div className="">
                    <Button onClick={() => showModal('receive')} content="Receive daily information" isActive={true} />
                    <Button onClick={() => showModal('stop')} content="Stop receiving daily information" isActive={false} />
                </div>
            </div>
            <div className="home-content">
                <WeatherCard />

                <div className="forecast-content">
                    <span className="forecast-content--header">Weather Forecast</span>

                    <div className="forecast-list">
                        <ForecastItem />
                        <ForecastItem />
                        <ForecastItem />
                        <ForecastItem />
                    </div>

                    <button className="forecast-next">
                        &gt;
                    </button>
                </div>
            </div>

            <EmailConfirmModal visible={isModalVisible} onClose={handleClose} type={modalType} />
        </div>
    )
}

export default HomePage
