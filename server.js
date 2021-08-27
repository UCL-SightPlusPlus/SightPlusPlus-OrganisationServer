require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const serverProfileRouter = require('./routes/serverProfileRoute')
const app = express();

// const session = require('express-session');
// const flush = require('connect-flash');

mongoose.connect(
   'mongodb://mongo:27017/SightPlusPlus', 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
    )
    .then(() => console.log('MomgoDB connected.'))
    .catch(err => console.log(`ERR OCCURED: ${err}`));

const ServerProfile = require('./models/serverProfileModel');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/profile', serverProfileRouter);
 
app.get('/', (req,res) => {

    ServerProfile.find({}, (err, profile) => {
        if (err) {
            console.error('Could not fetch server profile.');
        }
        const stringProfiles = JSON.stringify(profile);
        const jsonProfiles = JSON.parse(stringProfiles);
        res.render('index', {profiles: jsonProfiles});
    });
});

app.listen(5000);