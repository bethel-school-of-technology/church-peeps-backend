const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(session({ secret: 'perilous journey' }));
app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true  });
const connection = mongoose.connection;
connection.once("open", () => { console.log('connected to db');
});

const PrayerRouter = require('./routes/prayer');
const usersRouter = require('./routes/users');
const churchRouter = require('./routes/church');

app.use('/prayer', PrayerRouter);
app.use('/users', usersRouter);
app.use('/church', churchRouter)

app.listen(PORT, () => 
    console.log(`Server is running on port: ${PORT}`));