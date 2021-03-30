const moogoose = require('mongoose');
const ObjectID = require('bson');
const User = require('./User');
const Room = require('./Room');
const { Buffer } = require('buffer');
const Schema = moogoose.Schema;

let Message = new Schema({
    text: {
        type: String
    },
    fileName: {
        type: String
    },
    fileType: {
        type: String
    },
    fileSize: {
        type: Number
    },
    file: {
        type: String
    },
    created: {
        type: Date, default: Date.now  
    },
   owner: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    room: {
        type: Schema.Types.ObjectId, ref: 'Room'
    }
},{
    collection: 'messages'
})

module.exports = moogoose.model('Message', Message)