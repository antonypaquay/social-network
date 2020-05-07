const express = require('express');
const bearerToken = require('express-bearer-token');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const feedRoutes = require('./routes/feed');


mongoose.connect('mongodb+srv://antonypaquay:kpn355H8@cluster0-rkxs7.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        () => console.log('MongoDB connected! You are connected!')
    )
    .catch(
        () => console.log('MongoDB connection failed!')
    );

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());


app.use('/auth', userRoutes);
app.use('/dashboard', feedRoutes);






module.exports = app;
