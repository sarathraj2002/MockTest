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
   <div
  style={{
    maxWidth: '800px',
    margin: 'auto',
    padding: '50px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 8px 17px rgba(0, 0, 0, 4)',
    borderRadius: '10px',
  }}
>
  <h2 style={{ color: '#333', marginBottom: '20px' }}>Email Verification</h2>
  {!otpSent ? (
    <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="email" style={{ marginBottom: '10px', color: '#666' }}>Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
        style={{
          padding: '20px',
          marginBottom: '15px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          fontSize: '16px',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '12px 20px',
          backgroundColor: '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#357ABD')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#4a90e2')}
      >
        Send OTP
      </button>
      {errorMessage && (
        <p style={{ color: 'red', marginTop: '15px' }}>
          {errorMessage}
        </p>
      )}
    </form>
  ) : (
    <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="otp" style={{ marginBottom: '10px', color: '#666' }}>Enter OTP</label>
      <input
        id="otp"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        placeholder="Enter OTP"
        style={{
          padding: '12px',
          marginBottom: '15px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          fontSize: '16px',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '12px 20px',
          backgroundColor: '#5cb85c',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#4CAE4C')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#5cb85c')}
      >
        Validate OTP
      </button>
      {errorMessage && (
        <p style={{ color: 'red', marginTop: '15px' }}>
          {errorMessage}
        </p>
      )}
    </form>
  )}
</div>
)}
export default Email;