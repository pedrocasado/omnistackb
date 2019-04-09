const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {

    // resolve handles paths in different OS's (win/mac/linux/etc)
    // paths comma separated
    dest: path.resolve(__dirname, '..', '..', 'tmp'),

    // db, s3, filesystem
    storage: multer.diskStorage(
        {
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
            },
            filename: (req, file, cb) => {

                // generate random name
                crypto.randomBytes(16, (err, hash) => {

                    if (err) cb(err);

                    // no error
                    file.key = `${hash.toString('hex')}-${file.originalname}`;

                    cb(null, file.key);

                })
            }
        }
    )
};