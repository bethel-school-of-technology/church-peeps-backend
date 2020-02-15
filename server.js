const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => console.log('connected to db'));

// const router = express.Router();

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
// app.use(express.static(path.join(_dirname, 'public')));

// const ImageRouter = require('./routes/image');
// app.use('/image', ImageRouter);

app.use(cors());
app.use(express.json());

app.use(session({ secret: 'perilous journey' }));
app.use(passport.initialize());
app.use(passport.session());

const PrayerRouter = require('./routes/prayer');
const usersRouter = require('./routes/users');
const churchRouter = require('./routes/church');


app.use('/prayer', PrayerRouter);
app.use('/users', usersRouter);
app.use('/church', churchRouter);


app.listen(PORT, () => 
    console.log(`Server is running on port: ${PORT}`));