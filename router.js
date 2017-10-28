const multer = require('multer');

const Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./Images");
  },
  filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const upload = multer({
  storage: Storage
}).array("imgUploader", 3); //Field name and max coun

module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('./public/index.html');
  })

  app.get('/test', function (req, res) {
    res.send('Hello World!');
  })
  
  /**
   * Gets an binary image data as request, validates it as a PAN
   * and returns the extracted information.
   */
  app.post('/pan/process', function(req, res) {
    console.log('pan extraction request submitted. Body:\n');
    let buffer = req.body;
    console.log(buffer);
    console.log(buffer.toString());
    res.sendFile('submitted image');
  });

  app.post("/api/upload", function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
  });
}