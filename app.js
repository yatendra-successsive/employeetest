const express = require('express');
const mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/';
const app = express();


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
app.listen(3000,function(){
console.log('server start')
})

