
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
  console.log(data.googleId);
  return new Promise((resolve,reject)=>{
    db.models.users.find({where:{googleId:data.googleId}},(err,docs)=>{
      if(!err){
        console.log(docs);
        if(docs.length==0){
          db.models.users.create(data,(err)=>{
            if(!err){
              console.log("here");
              resolve({registered:false});
            }
            else{
              reject(err);
            }
          });
        }
        else{
          resolve({registered:true});
        }
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
