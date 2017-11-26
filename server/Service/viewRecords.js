
let viewRecords = (db,email,hash)=>{

  return new Promise((resolve,reject)=>{
    let data =[];
    db.models.doctors.find({where:{email:email}},(err,docs)=>{
      if(docs[0].patients!=undefined){
        if(docs[0].patients.indexOf(hash)!=-1){
          db.models.medicalRecords.find({where:{head:hash}},(err,docs)=>{
            resolve(docs);
          })
        }
      }
    });
  }).then((docs)=>{
    return docs;
  }).catch((err)=>{
    return err;
  })
};

module.exports = {viewRecords:viewRecords};
