const express=require('express');
const { default: mongoose } = require('mongoose');
const cart=require('./modules/user_cartSchema');


const router=express.Router();

router.post('/usercart',async(req,res)=>{
    console.log(req.body);
    const user=await cart.find(req.body)
    if(!user){
        res.json({
            status:"ERROR"
        })
    }
    else{
        res.json({
            user
        })
    }
})

router.post('/insertCart',async(req,res)=>{
    console.log(req.body);
    const data=new cart(req.body);
    const result=await data.save();
    if(!result){
        res.json({
            status:"Error"
        })
    }
    else{
        res.json({
            status:"Successfull",
            data:result
        })
    }
})

router.delete('/removeCart',async(req,res)=>{

    try{
    console.log('from removeCart:',req.body);
    const res1=await cart.deleteOne(req.body);
    if(res1){
        res.json({
            "status":"successfully deleted"
        })
    }
    }
    catch(err){
        console.log(err);
    }
});


module.exports=router