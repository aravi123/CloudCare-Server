const router = require('loopback').Router();
const app = require('./server.js');


const ipfs  = require('./Service/genesisBlock.js');

router.post('/ipfs',(req,res)=>{

  console.log(req.body);

  ipfs.ipfs(req.body).then((hash)=>{
    res.send(hash);
  }).catch((err)=>{
    res.send(err);
  })
});


module.exports = router;
