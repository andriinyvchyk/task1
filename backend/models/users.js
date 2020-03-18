const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    login:{type: String},
    password: { type: String },
    status: { type: String }

});

const Users = mongoose.model('users', UsersSchema)

module.exports = Users;