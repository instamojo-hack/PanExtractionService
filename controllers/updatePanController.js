const firebaseAdmin = require("../services/firebaseAdmin");

updatePanDetails = function updatePanDetails(req, res) {
  firebaseAdmin.database.ref(`panDetails/${recordId}`).set(req.body);
}

module.exports = {
  updatePanDetails:updatePanDetails
}

