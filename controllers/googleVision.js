// Imports the Google Cloud client library
var vision = require('@google-cloud/vision')({
  projectId: 'hack-mojo',
  keyFilename: 'google-vision-key.json'
});

var image = {
  source: {imageUri: 'gs://path/to/image.jpg'}
};

const processImage = function(imgBufferData, cb) {
  const image = {
    content: imgBufferData
  }
  vision.textDetection(image).then(response => {
    console.log(response);
  }).catch(err => {
    console.error(err);
  });
}

module.exports = {
  processImage: processImage
}