
let checkUser = (db,data)=>{

  return new Promise((resolve,reject)=>{

    db.models.doctors.find({where:{googleId:data.googleId}},(err,docs)=>{
      if(!err){
        if(docs.length!=0){
          resolve({registered:true});
        }
        else{
          resolve({registered:false});
        }
      }
      else{
        reject(err);
      }
    });
  }).then((data)=>{
    return data;
  }).catch((err)=>{
    return err;
  })
};


let signin = (db,data)=>{

  return new Promise((resolve,reject)=>{


    db.models.doctors.create(data,(err)=>{
      if(!err){
        resolve({success:true});
      }
      else{
        reject(err);
      }
    });
   }).then((data)=>{
     return data;
   }).catch((err)=>{
     return err;
   })
};

module.exports = {checkUser:checkUser,doctorSignin:signin};
