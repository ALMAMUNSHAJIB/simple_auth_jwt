const {Schema, model} = require('mongoose');


const userSchema = Schema({

    firstName: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    token: {type: String}

},{
    timestemaps: true
});

const User = model('User', userSchema);
module.exports =User;