# dwollaApi

# Creating customer 
url : http://localhost:3000/dwolla/createCustomer
body:  {
  "firstName": "Raseena",
  "lastName": "Sadique",
  "mobileNumber":"9988776655",
  "email": "raseena@gmail.com",
  "type": "personal",
  "address1": "Edakochi,Ernakulam",
  "city": "Ernakulam",
  "state": "NY",
  "postalCode": "67933",
  "dateOfBirth": "1997-10-23",
  "ssn": "1456"
}

# Adding bank account details to the newly created customer
url: http://localhost:3000/dwolla/addingCustBankDetails
body:{
    "bankName": "South Indian Bank",
    "mobileNumber": 9988776655,
    "routingNumber": "222222226",
    "accountNumber": "123456755",
    "bankAccountType": "checking"
}

# Creating Transfer 
url: http://localhost:3000/dwolla/createTransfer
body: {
    "mobileNumber":9988776655,
    "currency": "USD",
    "amount": "5.00"
}