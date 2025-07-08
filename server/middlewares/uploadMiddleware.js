const multer = require("multer");

// storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// file filter
const fileFilter = (req, file, cb) => {
    const allowedType = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedType.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .jpeg, and .png formats are allowed'), false);

    }
};

const upload = multer({ storage, fileFilter});

module.exports = upload