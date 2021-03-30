const moogoose = require('mongoose');
// const ObjectID = require('bson');
const User = require('./User');
const Message = require('./Message');
const Schema = moogoose.Schema;

let Room = new Schema({
   room_name: {
       type: String
    },
   created_date: {
       type: Date, default: Date.now
   }
},{
    collection: 'rooms'
})

module.exports = moogoose.model('Room', Room)