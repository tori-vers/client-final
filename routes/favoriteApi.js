// favoriteApi.js
const express = require('express');
const router = express.Router();
const ApplicationController = require('../application/applicationController');

const appController = new ApplicationController();

router.post('/toggleFavorite/:characterId', (req, res) => {
    const characterId = parseInt(req.params.characterId);
    const updatedFavorites = appController.toggleFavorite(characterId);
    res.json({ favorites: updatedFavorites });
});

router.get('/getFavorites', (req, res) => {
    const userFavorites = appController.getFavorites();
    res.json(userFavorites);
});

module.exports = router;