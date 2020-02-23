const jwt = require('jsonwebtoken');
const secret = 'secretkey';

const withAuth = function(req, res, next) {
    const token = req.cookies.token;
    console.log(req.cookies);
    if (!token) {
        res.status(401).send('Unauthorized, no token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized, invalid token');
            } else {
                console.log("decoded", decoded)
                req.username = decoded.username;
                next();
            }
        });
    }
}

module.exports = withAuth;