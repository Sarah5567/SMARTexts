const express = require('express');
const mongoose = require('mongoose');
const DocumentRouter = require('./routes/document')
const authRouter = require('./routes/authRoutes')
const UserRouter = require('./routes/user')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_CONNECT)
.then(()=>console.log('connected to MongoDB'))
.catch(err=>console.error(err));

const app = express();
app.use(express.json());
app.use('/user', UserRouter)
app.use('/document', DocumentRouter)
app.use('/auth', authRouter);
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})