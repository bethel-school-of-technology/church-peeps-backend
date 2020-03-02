const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => console.log('connected to db'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
  });
  
app.use(cors());
app.use(express.json());

app.use(session({ secret: 'perilous journey' }));
app.use(passport.initialize());
app.use(passport.session());

const PrayerRouter = require('./routes/prayer');
const usersRouter = require('./routes/users');
const ProfileRouter = require('./routes/profile');


app.use('/prayer', PrayerRouter);
app.use('/users', usersRouter);
app.use('/profile', ProfileRouter);


app.listen(PORT, () => 
    console.log(`Server is running on port: ${PORT}`));