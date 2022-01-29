const jwt = require('jsonwebtoken');

module.exports = (data) => {
    return jwt.sign(data, process.env.secret, { expiresIn: '1h' });
}
