const express=require('express');
const cors=require('cors')
const app=new express();
app.use(cors())              
const courseRoutes=require('./routes/courseroutes');
const user=require('./routes/user')
app.use('/course',courseRoutes);
// app.use('/delete/:id',courseRoutes);
app.use("/user",user)
require('dotenv').config();
const PORT=process.env.PORT;
require('./db/db')