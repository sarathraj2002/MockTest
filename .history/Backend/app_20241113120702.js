const express=require('express');
const cors=require('cors')
const bodyParser = require("body-parser");
const app=new express();
const otpRoutes=require('./route/otpRoutes')

require("dotenv").config();

require('./db/db')

app.use(cors());
app.use(bodyParser.json());
app.use('/api',otpR)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));