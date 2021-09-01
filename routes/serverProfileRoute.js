const express = require('express');
const router = express.Router();
const ServerProfile = require('../models/serverProfileModel');

router.post('/', (req, res) => {
  ServerProfile.findOneAndUpdate({site_name: req.body.site_name}, req.body, {upsert: true, new: true}, (err, profile) => {
    if(err) {
      res.status(400);
      res.send(err);
    } else {
      res.status(200).json('success');
    }
  });
});

router.get('/edit/:id', (req, res) => {
  ServerProfile.findById(req.params.id, (err, profile) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.render('edit', {profile: profile});
    }
  });
});

router.put('/:id', (req, res) => {
  ServerProfile.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true, useFindAndModify: false}, (err, profile) => {
    if (err) {
      console.log(err);
      res.render('edit', {profile: profile});
    } else {
      res.redirect('/');
    }
  })
});

router.delete('/:name', (req, res) => {
  ServerProfile.deleteOne({site_name: req.params.name}, (err, profile) => {
    if (err) {
      res.status(404);
      res.send(err);
    } 
    res.send({"message": "Deletion succeed!"});
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
