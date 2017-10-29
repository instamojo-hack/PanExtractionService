const vision = require('@google-cloud/vision')({
  projectId: 'hack-mojo',
  keyFilename: 'google-vision-key.json'
});

const async = require("async");
const admin = require("../services/firebaseAdmin");
const googleVisionHelper = require("../lib/googleVisionHelper");
const firebaseHelper = require("../lib/fireBaseHelper");
const path = require("path");
const sharp = require("sharp");

const extractImgBufferData = function(req) {
  console.log(req.files);
  const fileName = Object.keys(req.files)[0];
  const imgDataBuffer = new Buffer(req.files[fileName].data);
  const base64EncodedImgData = imgDataBuffer.toString('base64');
  return base64EncodedImgData;
}

const sharpenImage = function(imgBufferData, cb) {
  const SHARPEN_SIGMA =2.5
  var buf = Buffer.from(imgBufferData, 'base64');
  //sharp(buf).toFile('./.temp/original.jpg', (err, info) => console.error(err));
  const processedImage = sharp(buf).sharpen(SHARPEN_SIGMA);
  //processedImage.toFile('./.temp/processed.jpg', (err, info) => console.error(err));
  processedImage.toBuffer((err, data, info) => {
    if (err){
      cb(imgBufferData);
    }
    //console.log(`Buffer: ${JSON.stringify(data)}`);
    cb(Buffer.from(data, 'base64'));
  });
  return;
}

const processPanImage = function(req, res) {
  // Binary image data in request body takes precedence
  let imgBufferData;
  if (req.body.filename) {
    imgBufferData = req.body.filename.split(",")[1];  // Ignore the data tag
  } else {
    if (!req.files || (Object.keys(req.files).length === 0 && req.files.constructor === Object) ){
      console.error("req.files is not populated");
      res.status(500)
      return res.sendFile(path.resolve("public/template/500.html"));
    }
    imgBufferData = extractImgBufferData(req);
  }
  sharpenImage(imgBufferData, function(processedBase64Data) {
    const image = {
      content: processedBase64Data
    }
    async.parallel({
      validateLabels: function validateLabels(cb) {
        console.log("Running label detection");
        vision.labelDetection(image).then(response => {
          console.log(JSON.stringify(response));
          const IdentityDocumentConfidenceScore = googleVisionHelper.parseLabelDetectionResponse(response);
          const PASS_THRESHOLD_CONFIDENCE = 0.75;
          const passed = IdentityDocumentConfidenceScore > PASS_THRESHOLD_CONFIDENCE;
          console.log(`IdentityDocumentConfidenceScore: ${IdentityDocumentConfidenceScore} ; passed: ${passed}`);
          cb(null, passed);
        }).catch(err => {
          cb(err, null);
        });
      },
      validateWeb: function validateLabels(cb) {
        vision.webDetection(image).then(response => {
          console.log(JSON.stringify(response));
          const panConfidenceScore = googleVisionHelper.parseWebDetectionResponse(response);
          const PASS_THRESHOLD_CONFIDENCE = -1;
          const passed = panConfidenceScore > PASS_THRESHOLD_CONFIDENCE;
          console.log(`panConfidenceScore: ${panConfidenceScore} ; passed: ${passed}`);
          cb(null, passed);
        }).catch(err => {
          cb(err, null);
        });
      }
    },
    function (err, results) {
      if(err) {
        console.error(err);
        res.status(500);
        return res.sendFile(path.resolve("public/template/500.html"));
      }
      if (!(results.validateLabels && results.validateWeb)) {
        console.error("PAN validation failed.");
        res.status(422);
        return res.sendFile(path.resolve("public/template/422.html"));
      }
      console.log("All validations passed!");
    
      vision.textDetection(image).then(response => {
        const parsedResponse = googleVisionHelper.parseTextDetectionResponse(response);
        if (!parsedResponse) {
          res.status(422);
          return res.sendFile(path.resolve("public/template/422.html"));
        }
        const firebasePayload = firebaseHelper.prepareFirebasePayload(parsedResponse, imgBufferData)
        firebaseHelper.pushToFirebase(firebasePayload);
        return res.json(parsedResponse);
      }).catch(err => {
        console.error(err);
        res.status(500);
        return res.send("Error in textDetection");
      });
    });
  });
}

module.exports = {
  processImage: processPanImage
}