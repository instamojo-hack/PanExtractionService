const admin = require("../services/firebaseAdmin");
const firebase = require("firebase");

function authenticate(email, password, callback) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}


module.exports = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  authenticate(email, password, function(error, authData) {
    if (err) {
      console.error("Authentication failure");
      res.status(403);
      res.send();
    }
    console.log(`Sucessfully authenticated. Auth data: ${authData}`);
  })
}