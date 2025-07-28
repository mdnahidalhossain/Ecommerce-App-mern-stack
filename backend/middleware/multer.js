import multer from "multer"

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    },

    // destination: function (req, file, callback) {
    //     callback(null, path.join(__dirname, '../../frontend/src/assets'));
    // },
})

const upload = multer({ storage })


export default upload
