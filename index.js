const express = require("express");
const router = require("./router");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const fileUpload = require("express-fileupload");
const initFirebase = require("./services/firebaseAdmin");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.raw());
app.use(fileUpload());

router(app);

app.listen(3000, function () {
  console.log("Listening on port 3000!")
})
