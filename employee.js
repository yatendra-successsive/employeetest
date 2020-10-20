let mongoose = require('mongoose');
const server = 'localhost'; // REPLACE WITH YOUR DB SERVER
const database = 'employeedb';      // REPLACE WITH YOUR DB NAME
var dataset;
class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("employeedb");
  dataset = dbo.collection("employee_details").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

module.exports = new dataset


/*
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    First_Name: String,    
    Employee_ID:String
});

module.exports = mongoose.model('employee_details', employeeSchema);*/


