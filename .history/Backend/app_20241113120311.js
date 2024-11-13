const express=require('express');
const cors=require('cors')
const bodyParser = require("body-parser");
const app=new express();





require('./db/db')

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));