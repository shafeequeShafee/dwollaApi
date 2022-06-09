
// http://localhost:3000/dwolla/createCustomer


const mongoose = require("mongoose")
const customerSchema = new mongoose.Schema({
    
    firstName:{
        type :String
       
    },
    lastName:{
        type:String
        
    },
    mobileNumber:{
        type:Number,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    ipAddress:{
        type:String
    },
    customerUrl:{
        type:String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})

const Customer=mongoose.model('Customer',customerSchema)
module.exports ={Customer}