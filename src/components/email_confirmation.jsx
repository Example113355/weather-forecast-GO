import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import axios from 'axios';

const EmailConfirmModal = ({ visible, onClose, type }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [form] = Form.useForm();
    const [locations, setLocations] = useState([]);

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'))
    let locationOptions = searchHistory.map((location) => {
        return { label: location, value: location }
    });

    const handleNext = () => {
        form.validateFields()
            .then(values => {
                if (step === 1) {
                    setEmail(values.email);
                    setStep(2);
                    axios.post('https://weather-forecast-go-be.vercel.app/api/weather/register/send-code', {
                        email: email
                    })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        alert("Something went wrong. Please try again later.");
                    });
                } else if (step === 2) {
                    axios.post(`https://weather-forecast-go-be.vercel.app/api/weather/${type === 'stop'? 'unsubscribe': 'register'}/verify-code`, {
                        email: email,
                        code: values.code,
                        locations: locations
                    })
                    .then(response => {
                        alert("Your order has been successfully placed!");
                    })
                    .catch(err => {
                        alert("Something went wrong or Your code is wrong. Please try again later.");
                    });
                }

            })
            .catch(err => {
                console.log(err);
            });
        
    }

    const handleBack = () => {
        setStep(1);
    }

    const handleChange = (value) => {
        setLocations(value);
    };

    return (
        <Modal
            title="Email Confirmation"
            visible={visible}
            onCancel={onClose}
            footer={[
                step === 2 && (
                    <Button key="back" onClick={handleBack}>
                        Back
                    </Button>
                ),
                <Button key="submit" type="primary" onClick={handleNext}>
                    {step === 1 ? 'Next' : 'Confirm'}
                </Button>
            ]}
        >
            {step === 1 && (
                <p>You have just ordered to {type === 'stop' ? 'stop' : 'receive'} the daily weather information. Please enter your email to finish your order.</p>
            )}
            {step === 2 && (
                <p>We have sent a confirmation code to your email. Please enter the code to finish your order.</p>
            )}
            <Form form={form} layout="vertical">
                {step === 1 && (
                    <>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!'},
                                { type: 'email', message: 'Please input a valid email!'},
                            ]}
                        >
                            <Input 
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                            />
                        </Form.Item>

                        <Form.Item
                            label="Locations"
                            name="locations"
                            rules={[
                                { required: true, message: 'Please select your locations!' },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select your locations (need to search at least once)"
                                onChange={handleChange}
                                options={locationOptions}
                            />
                        </Form.Item>
                    </>
                )}
                {step === 2 && (
                    <Form.Item
                        label="Confirmation Code"
                        name="code"
                        rules={[
                            { required: true, message: 'Please input your confirmation code!' },
                        ]}
                    >
                        <Input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder='Enter your confirmation code'
                        />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    )
}

export default EmailConfirmModal
