const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.raw())

router(app);

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
