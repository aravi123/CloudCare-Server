var mongojs = require('mongojs');

var data = require('./final_data_in_json.json');

var db =mongojs("mongodb://cloudcare:carehack@ds119406.mlab.com:19406/cloudcare",["medicalRecords"]);


for(var i=0;i<data.length;i++){
  db.medicalRecords.save(data[i],(err)=>{
    if(!err){
      console.log("saved"+i);
    }
  })
}
