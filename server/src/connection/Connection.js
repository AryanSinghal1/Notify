const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Notify", {
    useNewUrlParser: true
}).then(()=>{console.log("Connection Successful")}).catch((e)=>{console.log(e)})