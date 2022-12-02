const mongoose = require('mongoose');
const currentDate = new Date();
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
        },
        date:{
            type:String,
            default: currentDate
        },
        favorite:{
            type:Boolean,
            default:false
        }
    }],

})
const notes = new mongoose.model('note', notesSchema);
module.exports = notes;