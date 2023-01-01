const express = require("express");
const app = express();
const cors=require('cors');

// cors and json
app.use(express.json())
app.use(cors({
    origin:"*",
}))

//connection
require("./DBconnection/conn")

//router
const employeeRoute=require("./employeeRoute")
const cartRoute=require("./cartRoute")
app.use(employeeRoute)
app.use(cartRoute)

//port assigning
const port = process.env.port || 8000;
app.listen(port, ()=>{
    console.log("connection is setup",port);
})
 
// Set EJS as templating engine
app.set("view engine", "ejs");