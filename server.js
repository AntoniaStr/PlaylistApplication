'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cookieParser());
const exphbs = require('express-handlebars');
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.static('public'));
app.use(fileUpload());
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {

    multiply: function(duration_ms) {
      let duration = duration_ms / 60000;
      return duration.toFixed(2);
    }
  }
}));
app.set('view engine', '.hbs');

const routes = require('./routes');
app.use('/', routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});