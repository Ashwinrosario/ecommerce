const express= require('express')
const user=require('./modules/userSchema.js')
var imgModel=require('./modules/mobileSchema.js')
var upload=require('./modules/multer.js')
const nodemailer=require('nodemailer');

const router=express.Router();
var fs = require('fs');
var path = require('path');

router.post('/insertrec',async(req,res)=>{
    try{
        console.log(req.body)
        const data=new user(req.body)
        console.log(req.body.email)
        const result=await data.save()

        if(!result){
            res.json({
                status:"Failed",
                message:"Not successful"
            })
        }
        else{
            res.json({
                status:"Success",
                message:"successful",
                data:result
            })
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'murugan.vishnurahul@gmail.com',
              pass: 'jbbesyhguazsnioa'
            }
          });
          
          var mailOptions = {
            from: 'murugan.vishnurahul@gmail.com',
            to: req.body.email,
            subject: 'Sending Email',
            text: 'Thank you for choosing mobile Paradise. Happy Shopping'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    catch(e){
        console.log(e)
    }
 }),

router.get('/getuser',async(req,res)=>{
    //res.header("Access-Control-Allow-Origin", "*");
    try{
        const users=await user.find()
        if(!users){
            res.json({
                status:"Failed",
                message:"Unable to get records"
            })
        }
        else{
            res.json({
                //status:"success",
                //message:"successfully retrieved",
                users
            })
            //console.log(result);
        }
        
    }
    catch(e){
        console.log(e)
    }
}),

router.post('/check',async(req,res)=>{
    console.log('from check printing request body',req.body);
    const pass = req.body.pass ;
    const hash = req.body.hash;
    const bcrypt =require('bcrypt');
    var match =await bcrypt.compare(pass,hash);
    console.log(match)
//    if (match){

  //  }
    res.json({
        status:"success",
        data:match
    })
 }),

 router.post('/singlerec',async(req,res)=>{
    console.log('from singlerec',req.body);
    const users=await user.find(req.body);
    if(!users){
        res.json({
            status:"error"
        })
    } 
    else{
        console.log('success')
        res.json({
            users
        })
    }
}),

router.post('/', upload.single('image'), (req, res, next) => {
 
    var obj = {
        phoneName: req.body.name,
        companyName: req.body.companyname,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        frontCam:req.body.frontCam,
        backCam:req.body.backCam,
        battery:req.body.battery,
        androidVersion:req.body.androidVersion,
        internalStorage:req.body.internalStorage,
        price:req.body.price,
        dimension:req.body.dimension,
        weight:req.body.weight,
        build:req.body.build,
        SIM:req.body.SIM,
        size:req.body.size,
        resolution:req.body.resolution,
        protection:req.body.protection,
        Technology:req.body.Technology,
        CPU:req.body.CPU,
        GPU:req.body.GPU
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});

router.get('/image', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

router.get('/getimages',(req,res)=>{
    imgModel.find({},(err,items)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(items);
        }
    })
});


router.post('/getSingleimage',async(req,res)=>{
    const data=await imgModel.find(req.body);
    console.log(req.body);
    if(!data){
        res.json({
            status:"error"
        })
    }
    else{
        res.json({
            data
        })
    }       
})


module.exports=router