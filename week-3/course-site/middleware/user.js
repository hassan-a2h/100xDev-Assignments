const jwt = require('jsonwebtoken');
const SECRET = 'Rana';

// Middleware for handling auth
async function userMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    if (!req.cookies || !req.cookies.authorization) {
        return res
            .status(401)
            .send('you need to be signed in');
    }
    
    try {
        const authToken = req.cookies.authorization.split(' ')[1];
        const { username } = jwt.verify(authToken, SECRET).user;
    
        req.username = username;
        next();
    } catch(err) {
        console.log('unable to verify user - ' + err);

        res
            .status(401)
            .send('unable to verify user');
    }
}

module.exports = userMiddleware;