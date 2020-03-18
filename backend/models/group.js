const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    title:{type: String},
    users: { type: Array }
});

const Group = mongoose.model('group', GroupSchema)

module.exports = Group;