var express = require('express');
var app = express();

app.use('/', express.static('./build'));

app.listen(47827);
