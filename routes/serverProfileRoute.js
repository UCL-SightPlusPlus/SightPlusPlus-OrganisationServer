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
      res.render('new', {profile: serverProfile});
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
      const serverProfile = new ServerProfile(req.body);
      res.render('edit', {profile: serverProfile});
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

module.exports = router;
