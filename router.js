const googleVision = require('./controllers/googleVision');

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('./public/index.html');
  })
  
  /**
   * Gets an binary image data as request, validates it as a PAN
   * and returns the extracted information.
   */
  app.post("/api/upload", function(req, res) {
    //console.log(req.files.sample.data);
    //console.log(req.body);
    //const imgDataBuffer = new Buffer(req.files.sample.data);
    //const base64EncodedImgData = imgDataBuffer.toString('base64');
    res.send("OK!");
  })};
