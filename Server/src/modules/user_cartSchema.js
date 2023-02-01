const mongoose=require('mongoose');

const userCart=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    product:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:String,
        required:true
    }
});

const Cart=new mongoose.model('usercart',userCart);
module.exports=Cart;