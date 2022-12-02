const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    photo:{
        type: String,
    },
    password:{
        type: String,
        required: true
    },
    notes:{
        type:Array
    },
    token:{
        type: String
    },
})
userSchema.pre("save", async function(next){
    if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
}
next();
})
userSchema.methods.generateAuthToken=async function(){
    try{
            const token = jwt.sign({_id: this._id.toString()}, "HelloeveryonewelcometoNotifyAppp")
            this.token = token;
            await this.save();
            return token;
        }catch(err){
            console.log("Error is"+err);
        }
}
const userModel = new mongoose.model('user', userSchema);
module.exports = userModel;