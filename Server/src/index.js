const express = require("express");
const app = express();
const cors=require('cors');


app.use(express.json())

app.use(cors({
    origin:"*",
}))

const port = process.env.port || 8000;
require("./DBconnection/conn")
const employeeRoute=require("./employeeRoute")
const cartRoute=require("./cartRoute")

app.use(employeeRoute)
app.use(cartRoute)

app.listen(port, ()=>{
    console.log("connection is setup",port);
})

 
// Set EJS as templating engine
app.set("view engine", "ejs");