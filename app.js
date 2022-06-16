const express = require("express")
const mongoose = require("mongoose")


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))   
const url ='mongodb://localhost/SfqDBex';

app.use(DateGenerator)
function DateGenerator(req, res, next) {
    console.log(new Date())
    next()
}


mongoose.connect(url, { useNewUrlParser: true }) 
const con = mongoose.connection 

con.on('open', function () {
    console.log("connected...")
})


const routerDwolla = require("./router/router")

app.use('/dwolla',routerDwolla)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is running on 3000")
})
