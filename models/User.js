const moogoose = require('mongoose');
const ObjectID = require('bson');
const Message = require('./Message');
const Room = require('./Room');
const Schema = moogoose.Schema;

let User = new Schema({
    nickname: {
        type: String
    },
    clientId: {
        type: String
    },
    joinedRooms: {
        type: Schema.Types.ObjectId, ref: 'Room'
    }
});

module.exports = moogoose.model('User', User)