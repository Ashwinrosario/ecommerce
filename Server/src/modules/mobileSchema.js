const mongoose=require('mongoose')


const mobileSchema=new mongoose.Schema({ 
    phoneName: String,
    companyName: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    frontCam:String,
    backCam:String,
    battery:String,
    androidVersion:String,
    internalStorage:String,
    price:String,
    dimension:String,
    weight:String,
    build:String,
    SIM:String,
    size:String,
    resolution:String,
    protection:String,
    Technology:String,
    CPU:String,
    GPU:String
})

module.exports = new mongoose.model('mobiles', mobileSchema);