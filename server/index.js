const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/dataBase');
const user = require('./routes/user');
const todo = require('./routes/todo');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // origin:'http://localhost:5173',
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
    httpOnly:true,
  })
);

dbConnect();

// Routes
app.use('/api/v1/user', user);
app.use('/api/v1/todo',todo)

//activate
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
})