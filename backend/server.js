const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json())


// Replace the following with values for your environment.
const username = encodeURIComponent("dbSafty");
const password = encodeURIComponent("atZf9dgE6aBX3uxu");
const clusterUrl = "cluster0.t42yh.mongodb.net/saftyRep_db?retryWrites=true&w=majority";
const authMechanism = "DEFAULT";
// Replace the following with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`; 


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});  

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));  

var Schema = mongoose.Schema;

const ReportSchema = new Schema({
  title:String,
  content:String,
  date:Date,
  isFinished:String,
  desc:String
})

var Reports = mongoose.model('reports',ReportSchema)

app.get('/',(req,res)=>{
  Reports.find({}).then(data=>{
    res.send(data)
}).catch(err=>{
    console.log(err)
})
})

app.listen(3000,()=>{
  console.log("server running")
})
/*
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("saftyRep_db");
    const reports = database.collection("reports");
    // Query for a movie that has the title 'The Room'
    const report = await reports.findOne();
    // since this method returns the matched document, not a cursor, print it directly
    console.log(report);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
*/