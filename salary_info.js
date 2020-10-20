const express = require('express');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/';
const app = express();

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("employeedb");
dbo.createCollection("salary_infos",{
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["employee_ID","Date_timestamp","amount"],
         properties: {
            employee_ID: {
               bsonType: "string",
               description: "must be a string and is required",              
            },
            Date_timestamp: {
               bsonType: "string",               
               description: "must be a string and is required"
            },            
            amount: {
               bsonType: "int",
               description: "must be a string and is required"          
            }
         }
      }
   }, validationAction: "warn" });
db.close();
});

/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("employeedb");
var date = new Date(); var timestamp = date. getTime();
  var myobj = { employee_ID: "1231556ttt23asdrrsad", Date_timestamp:timestamp,
               amount:"1655443123"};
  dbo.collection("salary_infos").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
*/
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("employeedb");
  var date = new Date(); 
  var timestamp = date. getTime();
  var myquery = { employee_ID: "1231556ttt23asdrrsad" };
  var newvalues = { $set: {Date_timestamp: timestamp ,amount: 5000} };
  dbo.collection("salary_infos").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    flag=1;
    db.close();
  });
}); 


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("employeedb");
  dbo.collection("salary_infos").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

var http = require('http');
http.createServer(function (req, res) {
var data = req.body;
var flag=0;
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.write('Hello World!=='+flag);
  res.end();
}).listen(9000);


