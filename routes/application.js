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
router.post('/favorites', function(req, res, next) {
    const appController = new ApplicationController();
    const { characterId, isFavorite } = req.body;

    if (characterId !== undefined && isFavorite !== undefined) {
      appController.updateFavoriteStatus(characterId, isFavorite);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Bad Request" });
    }
});
router.get('/favorites', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'public', 'favorites.html'));
});


module.exports = router;