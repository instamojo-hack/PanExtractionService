const admin = require("firebase-admin");
const serviceAccount = require("../firebase-config.json");

console.log("Initializing Firebase...");
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hack-mojo-data.firebaseio.com"
  });
}

module.exports = admin;