const firebaseAdmin = require("../services/firebaseAdmin");

function addUser(email, password, callback) {
  
    firebaseRef.createUser({
  
      email : email,
      password : password
    
    }, function(error, userData) {
      
      callback(error, userData.uid);
  
    });
  }
  
  
  function authenticate(email, password, callback) {
  
    firebaseRef.authWithPassword({
    
      email : email, 
      password : password
    
    }, function(error, authData) {
    
      callback(error, authData);
  
    });
  
  }

module.exports = function(req, res, next) {
  firebaseAdmin.auth().onAuthStateChanged(function(user) {
    if (user) {
      next()
    } else {
      console.log("not authenticated.. redirecting to login page");
      res.redirect('/login');
    }
  });
}