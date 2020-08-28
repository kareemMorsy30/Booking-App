const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

let login = async ({email, password}) => {
    let emailCheck = await User.findOne({email});
    if(!emailCheck) throw new Error('Email is incorrect!');
    let passCheck = await bcrypt.compare(password, emailCheck.password);
    if(!passCheck) throw new Error('Password is incorrect!');

    const token = JWT.sign({userId: emailCheck._id, email: emailCheck.email}, 'supersecretkeynooneknow', {
        expiresIn: "2h"
    });

    return {
        userId: emailCheck._id,
        token,
        expiresIn: 2
    }
}

module.exports = {
    login
}