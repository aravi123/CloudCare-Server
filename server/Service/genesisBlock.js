
const fs = require('fs');
const ipfs = require('ipfs-js');

const uuid = require('uuid/v1');


const nodemailer = require('nodemailer');

ipfs.setProvider(require('ipfs-api')('localhost', '5001'));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'carehackpiedpiper@gmail.com',
    pass: 'carestack'
  }
});
const mailOptions = {
  from: 'carestackpiedpiper@gmail.com',
  subject: 'Your Unique ID'
};

let p2p = (data,db)=>{
  data.nextHash = uuid();
  mailOptions.to = data.email;
  return new Promise((resolve,reject)=>{
    ipfs.addJson(data,(err,hash)=>{
      if(!err){
        mailOptions.html = '<p>'+hash+'</p>';
        transporter.sendMail(mailOptions,(err,info)=>{
          if(!err){
            console.log(info);
            db.models.medicalRecords.create({currentHash:data.nextHash},(err)=>{
              if(!err){
                db.models.users.updateAll({googleId:data.googleId},{aadharid:data.adhaarid},(err)=>{
                  if(!err){
                    let data1 = {hash:hash,nexthash:data.nextHash};
                    resolve(data1);
                  }
                  else{
                    reject(err);
                  }
                });
              }
              else{
                console.log(err);
                reject(err);
              }
            })
          }
          else{
            reject(err);
          }
        });
      }
      else{
        reject(err);
      }
    })
  }).then((hash)=>{
    return hash;
  }).catch((err)=>{
    return err;
  })
};

module.exports = {ipfs:p2p};
