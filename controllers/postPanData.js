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
  console.log(req.files);
  const fileName = Object.keys(req.files)[0];
  const imgDataBuffer = new Buffer(req.files[fileName].data);
  const base64EncodedImgData = imgDataBuffer.toString('base64');
  return base64EncodedImgData;
}

const validatePanImage = function(image) {
  vision.labelDetection(image).then(response => {
    
  }).catch(err => {
    console.error(err);
    res.status(500);
    return res.send("Error in labelDetection");
  });
}

const processPanImage = function(req, res) {
  if (!req.files || (Object.keys(req.files).length === 0 && req.files.constructor === Object)){
    console.error("req.files is not populated");
    res.status(500)
    return res.send("Error in processPanImage");
  } 
  const imgBufferData = extractImgBufferData(req);
  const image = {
    content: imgBufferData
  }
  res.send("OK")

  // vision.textDetection(image).then(response => {
  //   const parsedResponse = helper.parsePanCardResponse(response);
  //   const firebasePayload = prepareFirebasePayload(parsedResponse, imgBufferData)
  //   pushToFirebase(firebasePayload);
  //   res.json(parsedResponse);
  // }).catch(err => {
  //   console.error(err);
  //   res.status(500);
  //   return res.send("Error in textDetection");
  // });
}

module.exports = {
  processImage: processPanImage
}