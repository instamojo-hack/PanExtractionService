const postPanDataController = require("./controllers/postPanData");
const getPanDataController = require("./controllers/getPanData");

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('./public/index.html');
  })

  app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/template/login.html');
  })
  
  app.get('/admin', function(req, res) {
    res.sendFile(__dirname + '/public/template/admin.html');
  })

  
  /**
   * Gets an binary image data as request, returns the extracted information.
   */
  app.post("/api/pan", postPanDataController.processImage);

  app.get("/api/pan", getPanDataController.getPanData);
};
