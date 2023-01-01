const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')  

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
    
},
phonenumber:{
    type:Number,
    required:true,
    min:10,
},
address:{
    type:String,
    required:true
},
});

// const bcrypt = require('bcryptjs');
//       const decrypt = async(password)=>{
//         const hash = await bcrypt.hash(password,0);
//         this.password = hash;
//         console.log('from login hash',this.password)
//     }
//      decrypt(pass);

userSchema.pre('save',function (next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,0,(err, hash)=>{
            if(err){
                next(err)
            }
            else{
                this.password = hash;
                console.log('from schema encryption',hash)
                next();
            }
        })
    }  
})


const user = new mongoose.model('users',userSchema);
module.exports = user;
