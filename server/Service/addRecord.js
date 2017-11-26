
const onesignal  = require('node-onesignal-api');

const client = new onesignal({
  appId:"3410b4aa-f711-4d11-9b0a-a85bdfb1df2a",
  restApiKey:"ODYxOWZhYzYtMDRiNC00ZjU1LWIzNzctOGMzYjFkNmEyYjM3"
});

const crypto = require('crypto-js/sha256');

let addMedicalRcrd = (db,email)=> {

  return new Promise((resolve, reject) => {
    db.models.doctors.find({where: {email: email}}, (err, docs) => {
      if (docs[0].requestType != 1) {
        client.createNotification({
          contents: {
            contents: 'Write Acess requested!'
          },
          specific: {
            include_player_ids: [docs[0].playerid]
          },
          attachments: {
            data: {
              email: data.email,
              name: data.name,
              reqtype: 1
            }
          }

        }).then(()=>{
          resolve(false);
        }).catch((err)=>{
          reject(err);
        });
      }
      else{
        resolve(true);
      }
    })

  }).then((status)=>{
    return status;
  }).catch((err)=>{
    return err;
  })
};


let savercrd = (db,data,currenthash)=>{

  return new Promise((resolve,reject)=>{
    db.models.medicalRecords.find({head:currenthash},(err,docs)=>{

      let endhash = docs[docs.length-1].nexthash;

      data.curhash = endhash;
      data.nexthash = crypto(data);

      db.models.medicalRecords.create(data,(err)=>{
        if(!err){
          return({status:true});
        }
        else{
          reject(err);
        }
      })

    })
  }).then((status)=>{
    return status;
  }).catch((err)=>{
    return err;
  })

};

module.exports = {addrecrd:addMedicalRcrd,save:savercrd};
