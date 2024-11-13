const express = require("express");
const router = express.Router();
const OTP = require("../models/Otp");
const nodemailer = require("nodemailer");


router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  console.log("Request received to send OTP to:", email);

  try {
   
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

   
    await OTP.create({ email, otp });

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    
    const mailOptions = {
      to: email, // Recipient's email
      subject: "Your OTP Code",
      text: `Dear User,\n\nYour OTP code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nBest regards,\nYour App Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
});

module.exports = router;