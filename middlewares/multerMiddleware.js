const multer = require('multer')

//diskstorage

const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, './uploads')
    },
    filename: (req, file, callback) => {

        const filename = `image-${Date.now}-${file.originalname}`
        callback(null, filename)
    }

})
//file filter
const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') {
        callback(null, true)
    } else {
        callback(null, false)
        return callback(new Error(`Only png, jpeg and jpg files are allowed`))
    }

}
const multerMiddleware = multer({
    storage
})
module.exports = multerMiddleware