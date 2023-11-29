const express = require('express');
const path = require('path');
const applicationRouter = require('./routes/application');
const publicRouter = require('./routes/public'); 
const favoriteApiRouter = require('./routes/favoriteApi');
console.log("App: requirements done.");

var app = express();
console.log("App: express() done.");

app.use(express.static(path.join(__dirname, 'public')));
app.use('/application/', applicationRouter);
app.use('/', publicRouter);
app.use('/favoriteApi', favoriteApiRouter);
console.log("App: app.use() done.");


const PORT  = process.env.PORT || 3054
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`));
console.log("App: app.listen() done.");


module.exports = app;