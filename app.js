var express = require('express');
var path = require('path');

var applicationRouter = require('./routes/application');
var publicRouter = require('./routes/public');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/application/', applicationRouter);
app.use('/', publicRouter);


const PORT  = process.env.PORT || 3055
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`));


module.exports = app;