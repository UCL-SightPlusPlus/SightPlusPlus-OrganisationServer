require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const serverProfileRouter = require('./routes/serverProfileRoute')
const app = express();

// const session = require('express-session');
// const flush = require('connect-flash');

const ServerProfile = require('./models/serverProfileModel');

mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.set('view engine', 'ejs');
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
    })
})

app.listen(5000);