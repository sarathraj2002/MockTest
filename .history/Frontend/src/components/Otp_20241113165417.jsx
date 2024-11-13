import React, { useState } from 'react';
import axios from 'axios';

function Email({ onEmailSubmit }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);


  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
     
      const response = await axios.post('http://localhost:5000/api/send-otp', { email });
      const data = response.data;

      console.log(data); 

      if (data.success) {
        setOtpSent(true); 
        onEmailSubmit(email);
      } else {
        setErrorMessage('Error sending OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while sending OTP.');
      console.error('Error:', error);
    }
  };


  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { otp });
      const data = response.data;

      if (data.valid) {
        alert('OTP validated successfully!');
      } else {
        setErrorMessage(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while validating OTP.');
      console.error('Error:', error);
    }
  };

  return (
   