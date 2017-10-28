const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.raw())

router(app);

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
