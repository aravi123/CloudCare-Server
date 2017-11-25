
const fs = require('fs');
const ipfs = require('ipfs-js');

ipfs.setProvider(require('ipfs-api')('localhost', '5001'));


let p2p = (data)=>{
  return new Promise((resolve,reject)=>{
    ipfs.addJson(data,(err,hash)=>{
      if(!err){
        resolve(hash);
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
