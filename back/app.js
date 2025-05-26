const express = require('express');
const mongoose = require('mongoose');
const DocumentRouter = require('./routes/document')
const authRouter = require('./routes/authRoutes')
const UserRouter = require('./routes/user')
const cors = require('cors');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_CONNECT)
.then(()=>console.log('connected to MongoDB'))
.catch(err=>console.error(err));

const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5176',
        'http://localhost:5177',
        'http://localhost:5178',
        'http://localhost:5179'

    ],
    credentials: true
}));


app.use(express.json());
app.use('/user', UserRouter)
app.use('/document', DocumentRouter)

app.use('/auth', authRouter);
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})