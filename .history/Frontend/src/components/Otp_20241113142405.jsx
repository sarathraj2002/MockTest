import React, { useState } from "react";
import axios from "axios";

function Email({ onEmailSubmit }) {
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage,setErrorMessage]=useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post("http://localhost:5000/api/send-otp", { email });
      const data = response.data;

      console.log(data); 

      if (data.success) {
        setOtpSent(true); 
        onEmailSubmit(email);
      } else {
        setErrorMessage('Error sending OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage("Error sending OTP. Please try again.");
      console.error('Error:',error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/verify-otp", { email, otp });
      if (response.data.success) {
        alert("OTP verified! Redirecting to Welcome page...");
        setStep(3); 
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "30px 60px",
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif",
        background: "",
        borderRadius: "15px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        color: "#333",
      }}
    >
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <h2 style={{ marginBottom: "20px", color: "#4B6587" }}>Verify Your Email</h2>
          <label style={{ fontSize: "14px", fontWeight: "500" }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "15px 0",
              borderRadius: "10px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 25px",
              cursor: "pointer",
              backgroundColor: "#6a89cc",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontWeight: "500",
              fontSize: "15px",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4a69bd")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#6a89cc")}
          >
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <h2 style={{ marginBottom: "20px", color: "#4B6587" }}>Enter OTP</h2>
          <label style={{ fontSize: "14px", fontWeight: "500" }}>OTP Code</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "15px 0",
              borderRadius: "10px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 25px",
              cursor: "pointer",
              backgroundColor: "#38ada9",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontWeight: "500",
              fontSize: "15px",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#079992")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#38ada9")}
          >
            Verify OTP
          </button>
        </form>
      )}

      {step === 3 && (
        <div>
          <h2 style={{ marginBottom: "10px", color: "#38ada9" }}>🎉 Welcome! 🎉</h2>
          <p style={{ fontSize: "16px", fontWeight: "500", color: "#4B6587" }}>
            You have successfully verified your email.
          </p>
          <p style={{ fontSize: "14px", color: "#7f8c8d" }}>
            Thank you for using our service!
          </p>
        </div>
      )}
    </div>
  );
};

export default Otp;
