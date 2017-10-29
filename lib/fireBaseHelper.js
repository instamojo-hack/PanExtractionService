const admin = require("../services/firebaseAdmin");

const prepareFirebasePayload = function prepareFirebasePayload(parsedResponse, imgBufferData) {
  const firebasePayload = Object.assign({}, parsedResponse, {rawImage: imgBufferData})
  firebasePayload.rawImage = imgBufferData;
  //console.log("Firebase payload: \n", firebasePayload);
  return firebasePayload;
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