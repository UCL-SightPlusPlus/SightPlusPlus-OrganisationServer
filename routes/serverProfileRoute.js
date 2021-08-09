const express = require('express');
const router = express.Router();
const ServerProfile = require('../models/serverProfileModel');

router.get('/new', (req, res) => {
  res.render('new', {profile: new ServerProfile()});
});

router.post('/', (req, res) => {
  const serverProfile = new ServerProfile(req.body);
  serverProfile.save((err, profile) => {
    if (err) {
      console.log(err);
      const profileAndMessage = addErrorMessage(err, req);
      res.render('new', {profile: profileAndMessage});
    } else {
      res.redirect('/');
    }
  });
});

router.get('/edit/:id', (req, res) => {
  ServerProfile.findById(req.params.id, (err, profile) => {
    if (err) {
      console.log(err);
    } else {
      res.render('edit', {profile: profile});
    }
  });
});

router.put('/:id', (req, res) => {
  ServerProfile.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false}, (err, profile) => {
    if (err) {
      console.log(err);
      const profileAndMessage = addErrorMessage(err, req);
      res.render('edit', {profile: profileAndMessage});
    } else {
      res.redirect('/');
    }
  })
});

router.delete('/:id', (req, res) => {
  ServerProfile.deleteOne({_id: req.params.id}, (err, profile) => {
    if (err) {
      console.log(err);
    } 
    res.redirect('/');
  });
});

function addErrorMessage(err, req) {
    let profileAndMessage = {};
    profileAndMessage.site = req.body.site;
    profileAndMessage.description = req.body.description;
    profileAndMessage.url = req.body.url;
    if (err.code == 11000) {
      profileAndMessage.message = 'Site already exists!';
    } else {
      profileAndMessage.message = 'Oops! Save profile failed!';
    }
    return profileAndMessage;
}

module.exports = router;
