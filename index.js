const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(cookieParser('keyboard cat'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(require('./routes'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
