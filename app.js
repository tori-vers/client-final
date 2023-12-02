const express = require('express');
const path = require('path');
const ApplicationController = require('./application/applicationController'); // Add this line
const applicationRouter = require('./routes/application');
const publicRouter = require('./routes/public');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse JSON in requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.get('/application/favorites', function(req, res, next) {
    const appController = new ApplicationController();
    const favorites = appController.getFavoriteCharacters();
    res.json(favorites);
  });
app.use('/application/', applicationRouter);
app.use('/', publicRouter);


const PORT = process.env.PORT || 3055;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));

module.exports = app;