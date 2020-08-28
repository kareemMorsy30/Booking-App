const JWT = require('jsonwebtoken');
const User = require('../models/User');

let auth = (req, res, next) => {
    let auth = req.get('Authorization');
    if(!auth) {
        req.isAuth = false;
        return next();
    }
    const token = auth.split(' ')[1];
    if(!token){
        req.isAuth = false;
        return next();
    }

    try {
        const verifiedUser = JWT.verify(token, 'supersecretkeynooneknow');

        if(!verifiedUser){
            req.isAuth = false;
            return next();
        }
    
        return User
        .findById(verifiedUser.userId)
        .then(user => {
            req.isAuth = true;
            req.user = user;
            return next();
        });
    } catch(error) {
        req.isAuth = false;
        return next();
    }
}

module.exports = auth;