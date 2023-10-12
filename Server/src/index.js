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
var path = require('path');

 
// Set EJS as templating engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");