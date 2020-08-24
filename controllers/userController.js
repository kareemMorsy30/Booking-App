const User = require('../models/User');
const bcrypt = require('bcryptjs');

let users = () => {
    return User
    .find({})
    .then(users => users);
}

let user = async id => {
    try {
        const currentUser = await User.findById(id);
        return currentUser;
    } catch(err) {
        throw err;
    };
}

let createUser = args => {
    return User
    .findOne({email: args.userInput.email})
    .then(user => {
        if(user){
            throw new Error('User already exists!');
        }else {
            let user = new User({
                ...args.userInput,
                password: bcrypt.hashSync(args.userInput.password, 12)
            })
        
            return user
            .save()
            .then(result => {
                return {
                    ...result._doc,
                    password: null
                };
            })
            .catch(err => {
                throw err;
            })
        }
    })
}

module.exports = {
    users,
    user,
    createUser
}