const express = require('express');
const router = express.Router();
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


module.exports = router;