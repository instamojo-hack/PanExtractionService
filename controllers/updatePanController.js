const firebaseAdmin = require("../services/firebaseAdmin");

updatePanDetails = function updatePanDetails(req, res) {
  console.log(`Updating pan details: ${JSON.stringify(req.body)}`);
  console.log(req.params.recordId);
  firebaseAdmin.database().ref(`/panDetails/${req.params.recordId}`).update(req.body);
  res.send();
}

module.exports = {
  updatePanDetails:updatePanDetails
}

