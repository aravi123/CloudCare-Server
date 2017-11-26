
const onesignal  = require('node-onesignal-api');

const client = new onesignal({
  appId:"3410b4aa-f711-4d11-9b0a-a85bdfb1df2a",
  restApiKey:"ODYxOWZhYzYtMDRiNC00ZjU1LWIzNzctOGMzYjFkNmEyYjM3"
});


let medData = (db,data)=>{

  return new Promise((resolve,reject)=>{

    db.models.users.find({where:{aadharid:data.aadharid}},(err,docs)=>{
      if(!err){
        console.log(docs);
        if(docs.length!=0){
          client.createNotification({
            contents: {
              contents: 'Data requested!'
            },
            specific: {
              include_player_ids: [docs[0].playerid]
            },
            attachments: {
              data: {
                email: data.email,
                name:data.name,
                reqtype:data.reqtype
              }
            }
          }).then(success => {
            // ..
            console.log(success);
            resolve({sucess:true});
          }).catch((err)=>{
            reject(err);
          })
        }
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


module.exports = {medData:medData};
