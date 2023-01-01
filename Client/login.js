const bcrypt = require("bcryptjs");
const pass= "anusha"
const decrypt = async(password)=>{
    const hash = await bcrypt.hash(password,10);
    console.log(hash)
}
decrypt(pass);