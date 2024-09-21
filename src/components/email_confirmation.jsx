import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';

const EmailConfirmModal = ({ visible, onClose, type }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [form] = Form.useForm();

    const handleNext = () => {
        form.validateFields()
            .then(values => {
                setEmail(values.email);
                setStep(2);
            })
            .catch(err => {
                console.log(err);
            });
        
    }
    
    const handleBack = () => {
        setStep(1);
    }

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
                <p>You have just ordered to {type === 'stop'? 'stop': 'receive'} the daily weather information. Please enter your email to finish your order.</p>
            )}
            {step === 2 && (
                <p>We have sent a confirmation code to your email. Please enter the code to finish your order.</p>
            )}
            <Form form={form} layout="vertical">
                {step === 1 && (
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
                )}
                {step === 2 && (
                    <Form.Item
                        label="Confirmation Code"
                        name="code"
                        rules={[
                            { required: true, message: 'Please input your confirmation code!'},
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
