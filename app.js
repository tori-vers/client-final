var express = require('express');
var path = require('path');

var applicationRouter = require('./routes/application');
var publicRouter = require('./routes/public');
console.log("App: requirements done.");

var app = express();
console.log("App: express() done.");

app.use(express.static(path.join(__dirname, 'ditto'))); // originally public not ditto
app.use('/application/', applicationRouter);
app.use('/', publicRouter);
console.log("App: app.use() done.");


const PORT  = process.env.PORT || 3054
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`));
console.log("App: app.listen() done.");


module.exports = app;