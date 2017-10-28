const vision = require('@google-cloud/vision')({
  projectId: 'hack-mojo',
  keyFilename: 'google-vision-key.json'
});

const admin = require("../services/firebaseAdmin");
const helper = require("../lib/googleVisionHelper");


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

const extractImgBufferData = function(req) {
  const fileName = Object.keys(req.files)[0];
  const imgDataBuffer = new Buffer(req.files.sample.data);
  const base64EncodedImgData = imgDataBuffer.toString('base64');
  return base64EncodedImgData;
}

const processImage = function(req, res) {
  if (!req.files){
    res.status(500)
    return res.send("Something went wrong");
  } 
  const imgBufferData = extractImgBufferData(req);
  const image = {
    content: imgBufferData
  }

  vision.textDetection(image).then(response => {
    const parsedResponse = helper.parsePanCardResponse(response);
    const firebasePayload = prepareFirebasePayload(parsedResponse, imgBufferData)
    pushToFirebase(firebasePayload);
    res.json(parsedResponse);
  }).catch(err => {
    console.error(err);
    res.status(500);
    return res.send("Something went wrong");
  });
}

module.exports = {
  processImage: processImage
}