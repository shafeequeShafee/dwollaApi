

const mongoose = require("mongoose")
const customerSchema = new mongoose.Schema({
    
    firstName:{
        type :String
       
    },
    lastName:{
        type:String
        
    },
    mobileNumber:{
        type:String,
        unique:true
    },
    type:{
        type:String
    },
    address1:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    postalCode:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    ssn:{
        type:String
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