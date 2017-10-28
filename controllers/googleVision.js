const vision = require('@google-cloud/vision')({
  projectId: 'hack-mojo',
  keyFilename: 'google-vision-key.json'
});

const helper = require('../lib/googleVisionHelper');

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
  const image = {
    content: extractImgBufferData(req)
  }
  vision.textDetection(image).then(response => {
    const parsedResponse = helper.parsePanCardResponse(response);
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