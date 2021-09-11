require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const serverProfileRouter = require('./routes/serverProfileRoute')
const app = express();

// const session = require('express-session');
// const flush = require('connect-flash');

mongoose.connect(
    `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
    )
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(`ERR OCCURED: ${err}`));

const ServerProfile = require('./models/serverProfileModel');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/profile', serverProfileRouter);
 
app.get('/', (req,res) => {

    ServerProfile.find({}, (err, profiles) => {
        if (err) {
            console.error('Could not fetch server profile.');
        }
        res.render('index', {profiles: profiles});
    });
});

module.exports = app.listen(5000);