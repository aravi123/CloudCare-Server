
let signup = (db,data)=>{

  return new Promise((resolve,reject)=>{
    db.models.users.create(data,(err)=>{
      if(!err){
        resolve(true);
      }
      else{
        reject(err);
      }
    });
  }).then((status)=>{
    return status;
  }).catch((err)=>{
    return err;
  })

};

let checkUserExists = (db,data)=>{

  return new Promise((resolve,reject)=>{
    db.models.users.find({googleId:data},(err,docs)=>{
      if(!err){
        resolve(docs);
      }
      else{
        reject(err);
      }
    })
  }).then((docs)=>{
    return docs;
  }).catch((err)=>{
    return err;
  });
};

module.exports = {signup:signup,checkUserExists:checkUserExists};
