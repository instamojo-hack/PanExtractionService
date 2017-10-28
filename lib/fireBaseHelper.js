const admin = require("../services/firebaseAdmin");

const prepareFirebasePayload = function prepareFirebasePayload(parsedResponse, imgBufferData) {
  parsedResponse.rawImage = imgBufferData;
  console.log("Firebase payload: \n", parsedResponse);
  return parsedResponse;
}

const pushToFirebase = function pushToFirebase(firebasePayload) {
  admin.database().ref(`/panDetails`)
  .push(firebasePayload)
  .then(() => {
    console.log("Sucessfully pushed to firebase");
  }).catch((err) => {
    console.error(err);
  });
}

module.exports = {
  prepareFirebasePayload: prepareFirebasePayload,
  pushToFirebase: pushToFirebase
}