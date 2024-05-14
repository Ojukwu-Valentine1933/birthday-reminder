const crypto = require('crypto');

const generateRandomToken = (length) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(Math.ceil(length / 2), (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                const token = buffer.toString('hex').slice(0, length);
                resolve(token);
            }
        });
    });
};

module.exports = generateRandomToken;


