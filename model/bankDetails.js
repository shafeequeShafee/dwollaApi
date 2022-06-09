


const mongoose = require("mongoose")
const bankSchema = new mongoose.Schema({
    bankName:{
        type:String
    },
    mobileNumber:{
        type:String,
        unique:true
    },
    routingNumber:{
        type :String
       
    },
    accountNumber:{
        type:String
        
    },
    bankAccountType:{
        type:String,
    },
    accountUrl:{
        type:String
    }

})

const BankDetails=mongoose.model('BankDetails',bankSchema)
module.exports ={BankDetails}