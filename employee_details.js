/*Create CRUD endpoints to save employe details with the following information:
Employee ID (Should be Alphanumeric and of 16 characters)
First Name (Should have minimum 3 characters)
Last Name (Should have minimum 3 characters)
Phone Number (10 Digit Mobile no.)*/
//****************************************************/

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
//Route handler
/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
//  var dbo = db.db("employeedb");
dbo.createCollection("employee_details", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "Employee_ID","First_Name","Last_Name","Phone_Number" ],
         properties: {
            Employee_ID: {
               bsonType: "string",
               description: "must be a string and is required",               
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

app.post('/employee_details', function(req, res){
    console.log(req.body);   
    var data = req.body;
     var datastatus = req.body.dstatus;
        var employeeid =  req.body.eid;
        var fname      =  req.body.fname;
        var lname      =  req.body.lname;
        var phone      =  parseInt(req.body.phoneno);
        if(fname.length<3){
            console.log("phoneno is not valid");
            res.json({"error":"First Name should be maximum 3 charecter"});
        }
        if(phone.length<10){
            console.log("phoneno is not valid");
            res.json({"error":"phoneno is not 10 digit"});
        }else{
      
       if(checkForHexRegExp.test("5e63c3a5e4232e4cd0274ac2")==true){
       
        if(datastatus=="update"){ 
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("employeedb");
                var myquery = { Employee_ID: employeeid };
                var newvalues = { $set: {First_Name: fname, Last_Name: lname ,phoneno:phone } };
                dbo.collection("employee_details").updateOne(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                  console.log("1 document updated");
                  db.close();
                });
              });
            }    
//*******************************Delete***********************************/
         if(datastatus=="delete"){ 
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("employeedb");
                 var myquery = { Employee_ID: employeeid };
                dbo.collection("employee_details").deleteOne(myquery, function(err, obj) {
                  if (err) throw err;
                  console.log("1 document deleted");
                  db.close();
                });
              });
          }
 //*******************************Delete***********************************/               
/********************************CREATE***************************************/                
        if(datastatus=="create"){   
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("employeedb");
                var myobj = { Employee_ID:employeeid, First_Name:fname,Last_Name:lname, Phone_Number:phone};
                console.log(myobj);
                var dataset = dbo.collection("employee_details").find( { "Employee_ID": employeeid });
                console.log(dataset);
               if(dataset.length==0){
                dbo.collection("employee_details").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
                });
               }else{
                    res.json({"error":"Employeeid is already exit."}); 
               } 
            });
         } 
     }else{
        res.json({"error":"Employee id should be  alphanumeric"});
     }
    }
/********************************CREATE***************************************/                

//res.json(data);
});
app.listen(3000);
