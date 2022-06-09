var Client = require("dwolla-v2").Client;

const appKey = "2KqnvEWkCJynFCPMnEBc92P1cH3FWI3ykoDwE9gAHohkOi6Ezq";
const appSecret = "eOU8N4GydaI2H5rmSNZPPVRpitJxygy4Yrk7YpJKRo0KiTo45P";
const dwolla = new Client({
    key: appKey,
    secret: appSecret,
    environment: "sandbox",
});


const { Customer } = require("../model/customer")
const { BankDetails } = require("../model/bankDetails")

// Creating Customer , I referred the dwolloDeveloper document, given  below the link
//https://developers.dwolla.com/guides/send-money/create-a-customer

const createCustomer = async (req, res) => {
    const customers = new Customer(req.body)
    // await customers.save()
    var customerCreated = false

    try {
        
        var requestBody = {
            firstName: req.body.firstName,
            lastName:req.body.lastName ,
            email: req.body.email,
            type: req.body.type,
            address1: req.body.address1,
            type:req.body.type ,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode,
            dateOfBirth: req.body.dateOfBirth,
            ssn: req.body.ssn
        }
        await dwolla.post("customers", requestBody).then(function (res) {
            res.headers.get("location");
            if (res.status === 201) {
                customers.customerUrl = res.headers.get("location")
                customers.save()  
                customerCreated = true    
            }
              
        });
        if(customerCreated){
            res.send("customer details are added")
        }  
    }
    catch (error) {
        console.error(error);
        res.send("customer details not added, error occured");
    }
}

// for adding bankAccountDetails , I referred the dwollo Developer document, given  below the link
//https://developers.dwolla.com/guides/send-money/add-funding-source

const addingCustBankDetails = async (req, res) => {
    const bankDetails = new BankDetails(req.body)
    var bankDetailsAdded =false

    try {
        const customer = await Customer.find({"mobileNumber": req.body.mobileNumber })
        var customerUrl = customer[0].customerUrl
        var requestBody = {
            name: req.body.bankName,
            routingNumber: req.body.routingNumber,
            accountNumber: req.body.accountNumber,
            bankAccountType: req.body.bankAccountType
        }

        await dwolla.post(`${customerUrl}/funding-sources`, requestBody).then(function (res) {
            res.headers.get("location");
            if (res.status === 201) {
                bankDetails.accountUrl = res.headers.get("location")
                bankDetails.save()
                bankDetailsAdded = true 
            }
            

        });
        if(bankDetailsAdded){
            res.send("bank Details Added")
        }
        
    }
    catch (error) {
        console.error(error);
        res.send("bank Details not added Added,error occured");
    }
}



//// for creating Transaction , I referred the dwollo Developer document, given  below the link
//https://developers.dwolla.com/guides/send-money/create-transfer

const createTransfer = async (req, res) => {
    try {

    
        const Recievingcustomer = await BankDetails.find({"mobileNumber": req.body.mobileNumber })

        var currency = req.body.currency
        var amount = req.body.amount
        let transferDone = false

        var RecCustomerAcntUrl = Recievingcustomer[0].accountUrl

        var transferRequest = {
            _links: {
                source: {
                    href: "https://api-sandbox.dwolla.com/funding-sources/396ccaca-8366-490a-bb71-8905031823b8"
                },
                destination: {
                    href: RecCustomerAcntUrl,
                },
            },
            amount: {
                currency: currency,
                value: amount
            },
        };

        await dwolla.post("transfers", transferRequest).then(function (res) {
            res.headers.get("location");
            if (res.status == 201) {
                transferDone = true
            }

            console.log(res.headers.get("location"))
        })

        if (transferDone) {
            res.send("money is transfered")
        }
    }
    catch (error) {
        console.error(error);
        res.send("money is not transfered, error occured")
    }
}


module.exports = {
    createCustomer,
    addingCustBankDetails,
    createTransfer
}
