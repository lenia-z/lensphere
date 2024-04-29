const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the file path
    cb(null, path.join(__dirname, '../public/images/'));
  },
  filename: function (req, file, cb) {
    // Set the file name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;