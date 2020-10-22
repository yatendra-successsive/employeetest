const express = require('express');
const { body } = require('express-validator');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/';
const app = express();
var   router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
// parse various different custom JSON types as JSON
app.use(upload.array()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
   console.log("Start");
   next();
});

//****************************document created first time*********************/
/*MongoClient.connect(url, function(err, db) {
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
});*/
//
app.post('/salary_details', function(req, res){
      console.log(req.body);   
      var data = req.body;
      var datastatus = req.body.dstatus;
      var employeeid =  req.body.eid;
      var salary      =  req.body.amount;
//************************************************************************/
if(datastatus=="create"){     
MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("employeedb");
        var date = new Date(); var timestamp = date. getTime();
        var myobj = { employee_ID: employeeid, Date_timestamp:timestamp,
                    amount:salary};
        dbo.collection("salary_infos").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
  }
//***************************************************************/
if(datastatus=="updated"){    
MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("employeedb");
        var date = new Date(); 
        var timestamp = date. getTime();
        var myquery = { employee_ID: employeeid };
        var newvalues = { $set: {Date_timestamp: timestamp ,amount: 5000} };
        dbo.collection("salary_infos").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          flag=1;
          db.close();
        });
      }); 
  }
/*****************************************************************/
if(datastatus=="view"){    
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("employeedb");
    dbo.collection("salary_infos").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
}
});

//************************************************************//
     app.listen(3000);
    
