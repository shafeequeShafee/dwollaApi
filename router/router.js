const express = require('express')
const routerDwolla =express.Router()

const {createCustomer,addingCustBankDetails,createTransfer}=require("../contoller/controller")

routerDwolla.post('/createCustomer',createCustomer)
routerDwolla.post('/addingCustBankDetails',addingCustBankDetails)
routerDwolla.post('/createTransfer',createTransfer)



module.exports = routerDwolla