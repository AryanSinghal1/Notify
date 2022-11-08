const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    notes:[{
        title:{
            type: String,
        },
        description:{
            type:String
        }
    }]
})
const notes = new mongoose.model('note', notesSchema);
module.exports = notes;