
const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/mobiledb")
.then(()=>{
    console.log("connection is successsful")
}).catch((err)=>{
    console.log("connection is not successsful")
})