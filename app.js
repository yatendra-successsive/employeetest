const express = require('express');
const mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/';
const app = express();

/*var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Userame should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: false,
        message: 'Name should contain alpha-numeric characters only'
    })
];*/
/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("employeedb");
dbo.createCollection("employee_details", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "Employee_ID","First_Name","Last_Name","Phone_Number" ],
         properties: {
            Employee_ID: {
               bsonType: "string",
               description: "must be a string and is required",
              // validate:usernameValidator
            },
            First_Name: {
               bsonType: "string",               
               description: "must be a string and is required"
            },            
            Last_Name: {
               bsonType: "string",
               description: "must be a string and is required"               
            },
           Phone_Number: {
               bsonType: "INT",
               maximum :10            
            },
         }
      }
   }, validationAction: "warn" });

db.close();
});
*/
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("employeedb");
  var myobj = { Employee_ID: "1231556ttt23asdrrsad", First_Name: "finalway 37" ,
              Last_Name:"kumar", Phone_Number:"1655443123"};
  dbo.collection("employee_details").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("employeedb");
  dbo.collection("employee_details").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("employeedb");
   var myquery = { Employee_ID: '123123asdrrsad' };
  dbo.collection("employee_details").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("employeedb");
  var myquery = { Employee_ID: "123155623asdrrsad" };
  var newvalues = { $set: {First_Name: "Mickey", Last_Name: "Canyon 123" } };
  dbo.collection("employee_details").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
}); 

  

app.listen(9000,function(){
console.log('server start')


})

