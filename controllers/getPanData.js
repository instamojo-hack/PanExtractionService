const admin = require("../services/firebaseAdmin");

const getPanData = function getPanData(req, res) {
  console.log("Fetching PAN details from firebas...");
  admin.database().ref(`/panDetails`)
  .on('value', snapshot => {
    return res.json(snapshot.val());
  });
}

module.exports = {
  getPanData: getPanData
}
