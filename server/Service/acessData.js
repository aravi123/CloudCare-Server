
const firebase = require('firebase');

var config = {
  apiKey: "AIzaSyBpdWt_k8iCOafpvjtuDNWEpkZlCbujxeQ",
  authDomain: "carestack-771d7.firebaseapp.com",
  databaseURL: "https://carestack-771d7.firebaseio.com",
  projectId: "carestack-771d7",
  storageBucket: "carestack-771d7.appspot.com",
  messagingSenderId: "403579118721"
};
firebase.initializeApp(config);

var database = firebase.database();



let acessData = (db,data)=>{
  let flag =0;
  return new Promise((resolve,reject)=>{

    //doctor id
    //check permission of the system
    db.models.doctors.find({where:{email:data.email}},(err,docs)=>{
      if(!err) {
        if (docs[0].patients!= undefined) {
          for (let i = 0; i < docs[0].patients.length; i++) {
            if (docs[0].patients[i] == data.nexthash) {
              flag = 1;
              break;
            }
          }
        }
        if(flag!=1){
          db.models.doctors.updateAll({email:data.email},{$push:{patients:data.nexthash},requestType:data.reqtype},(err,docs)=>{
            if(!err){
              let d =data.email.split('@')[0];
              firebase.database().ref('/links/'+d).set({
                "url":"/medicalRecords/"+data.nexthash,
                "timestamp":new Date()
              });
              resolve(docs[0]);
            }
            else{
              reject(err);
            }
          });
        }
        else{
          let d = data.email.split('@')[0];
          firebase.database().ref('/links/'+d).set({
            "url":"/medicalRecords/"+data.nexthash
          });
          resolve(docs[0]);
        }
      }
    });

  }).then((docs)=>{
    return docs;
  }).catch((err)=>{
    return err;
  })

};

let acess = (data)=>{
  return new Promise((resolve,reject)=>{
    let d = data.email.split('@')[0];
    firebase.database().ref('/error/'+d).set({
      "url":false
    });
    resolve();
  }).then(()=>{
    return true;
  }).catch(()=>{
    return false;
  })
};

module.exports = {changePermission:acessData,deniedPermission:acess};
