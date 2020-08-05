const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/products')
    },
    filename: function (req, file, cb) {
      cb(null,  req.body.name.replace('/', '_') + '-' + Date.now() + '.jpg');
    }
  })
const upload = multer({storage, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
        console.log("I am here in multer");
      }
})

exports.machineImage = upload