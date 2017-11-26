
const mongojs = require('mongojs');

const db = mongojs("mongodb://cloudcare:carehack@ds119406.mlab.com:19406/cloudcare",["medicalRecords"]);
const zerorpc = require('zerorpc');

const client  = new zerorpc.Client();

client.connect("tcp://127.0.0.1:4342");

let search = (search)=>{

  return new Promise((resolve,reject)=>{
    console.log(search);
      db.medicalRecords.find({$text:{$search:search}},(err,docs)=>{
        console.log(docs);
        client.invoke("main",JSON.stringify(docs),(err,res,more)=>{
          let data = [];
          data.push({Name:res.Name,Diagonosis:res.Diagnosis.toString(),Address:res.Address.toString()});
          resolve(data);
        })
      })
  }).then((docs)=>{
    return docs;
  }).catch((err)=>{
    return err;
  })

};


module.exports = {search:search};
