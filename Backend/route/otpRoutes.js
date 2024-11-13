const express = require("express");
const router = express.Router();
const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS }
  });
router.post('/send-otp',async (req,res)=>{
    const {email} =req.body;
    const otp=Math.floor(1000+Math.random()*9000);
    const mailOptions = {
        from: process.env.Email_User,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}`,
      };
      try {
        await transporter.sendMail(mailOptions);
      
        await Otp.create({ email, otp });
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
      }
    });

    router.post('/verify-otp', async (req, res) => {
        const { otp } = req.body;
        console.log(otp);
        const record = await Otp.findOne({ otp });
        console.log(record);
        if (!record) {
          return res.json({ valid: false, message: 'Invalid OTP. Please try again.' });
        }
      
        
        return res.json({ valid: true });
      });
      


module.exports = router;