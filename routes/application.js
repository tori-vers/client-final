const express = require('express');
const router = express.Router();
const { Router } = require('express');
const path = require('path');
const ApplicationController = require('../application/applicationController');

router.get('/character', function(req, res, next) {
  const appController = new ApplicationController();
  const html = appController.getAllCharacters();
  res.send(html);
});

router.get('/character/:id', function(req, res, next) {
  const appController = new ApplicationController();
  const html = appController.getCharacterById(req.params.id);
  res.send(html);
});


router.get('/character/:uni', function(req, res, next) {
  const appController = new ApplicationController();
  const characters = appController.getCharacterByUni(req.params.uni);  // Use req.params.uni
  res.json(characters);
});


router.get('/character/:alignment', function(req, res, next) {
  const appController = new ApplicationController();
  const html = appController.getCharacterByAlignment(req.params.alignment);
  res.send(html);
});

router.post('/favorites', function(req, res, next) {
    const appController = new ApplicationController();
    const { characterId, isFavorite } = req.body;

});


router.get('/favorites', function(req, res, next) {
  const appController = new ApplicationController();
  const favorites = appController.getFavoriteCharacters();
  res.json(favorites);
});

router.post('/character/toggle-favorite/:id', function(req, res, next) {
  const appController = new ApplicationController();
  const updatedFavorites = appController.toggleFavorite(req.params.id);
  res.json(updatedFavorites);
});

module.exports = router;