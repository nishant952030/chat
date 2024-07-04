const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/index.js')
const connectDB=require('./config/connectDB.js')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.get('/', (req, res) => {
    return res.send('hello from server')
})
//api endpoints
app.use('/api', router);
const PORT = process.env.PORT || 8000
connectDB().then(() => {
    app.listen(PORT,()=>{console.log('server running at :',PORT)})
})
