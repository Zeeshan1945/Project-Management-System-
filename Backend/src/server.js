
require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB=require('./config/db');

connectDB();
const app=express();
app.use(cors( {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
} ));
app.use(express.json());

app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/projects',require('./routes/projectRoutes'));
app.use('/api/tasks',require('./routes/taskRoutes'));

app.listen(process.env.PORT||5000,()=>console.log('Server running'));
