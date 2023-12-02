const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '..', 'public', 'images', 'products'));
    },
    filename: (req, file, callback) => {
        callback(null, uuidv4() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        req.wrongFileFormat = true;
        callback(null, false);
    }
}


module.exports = {
    fileStorage,
    fileFilter
}