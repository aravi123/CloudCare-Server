const router = require('loopback').Router();
const app = require('./server.js');


const ipfs  = require('./Service/genesisBlock.js');
const login = require('./Service/login.js');

router.post('/ipfs',(req,res)=>{

  console.log(req.body);

  ipfs.ipfs(req.body,app).then((hash)=>{
    res.send(hash);
  }).catch((err)=>{
    res.send(err);
  })
});

router.post('/signup',(req,res)=>{
  console.log(req.body);
  login.signup(app,req.body).then((status)=>{
    res.send(true);
  }).catch((err)=>{
    res.send(err);
  });
});

router.post('/checkUserexists',(req,res)=>{
  console.log(req.body);
  login.checkUserExists(app,req.body.googleId).then((docs)=>{
    res.send(docs);
  }).catch((err)=>{
    res.send(err);
  });
});


module.exports = router;
