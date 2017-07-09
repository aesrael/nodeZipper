var express = require('express');
var router =require('./router');


var app = express();

app.set('view engine','ejs');

app.use('/assets',express.static('assets'));

router(app);

app.listen(8080);
console.log('listening at 8080');


