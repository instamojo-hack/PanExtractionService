const googleVision = require("./controllers/googleVision");

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('./public/index.html');
  })

  app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/template/login.html');
  })
  
  /**
   * Gets an binary image data as request, validates it as a PAN
   * and returns the extracted information.
   */
  app.post("/api/upload", googleVision.processImage);
};
