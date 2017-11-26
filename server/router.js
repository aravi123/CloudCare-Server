const router = require('loopback').Router();
const app = require('./server.js');


const ipfs  = require('./Service/genesisBlock.js');
const login = require('./Service/login.js');
const medData = require('./Service/medicalData.js');
const permission = require('./Service/acessData.js');
const doctor = require('./Service/doctor.js');
const records = require('./Service/viewRecords.js');
const addrcrd = require('./Service/addRecord.js');
const find = require('./Service/search.js');






router.post('/ipfs',(req,res)=>{

  console.log(req.body);

  ipfs.ipfs(req.body,app).then((hash)=>{
    console.log(hash);
    res.send(hash);
  }).catch((err)=>{
    res.send(err);
  })
});



router.post('/checkUserexists',(req,res)=>{
  console.log(req.body);
  login.checkUserExists(app,req.body).then((docs)=>{
    res.send(docs);
  }).catch((err)=>{
    res.send(err);
  });
});


router.post('/medData',(req,res)=>{
  console.log(req.body);
  medData.medData(app,req.body).then((status)=>{
    res.send(status);
  }).catch((err)=>{
    res.send(err);
  })
});

router.post('/givePermission',(req,res)=>{
  console.log(req.body);
  if(req.body.status)
    permission.changePermission(app,req.body).then((docs)=>{
      res.send(docs);
    }).catch((err)=>{
      res.send(err);
    });
  else{
    permission.deniedPermission(req.body).then((status)=>{
      res.send(status);
    }).catch((status)=>{
      res.send(status);
    })
  }
});

router.post('/checkDoctorexists',(req,res)=>{
  console.log(req.body);
  doctor.checkUser(app,req.body).then((data)=>{
    res.send(data);
  }).catch((err)=>{
    res.send(err);
  });
});

router.post('/doctorSignin',(req,res)=>{
  console.log(req.body);
  doctor.doctorSignin(app,req.body).then((data)=>{
    res.send(data);
  }).catch((err)=>{
    res.send(err);
  });
});


router.get('/medicalRecords/:id',(req,res)=>{
  let hash = req.url.split('/')[2].split('?')[0];
  let email = req.url.split('/')[2].split('?')[1].split('=')[1];
  console.log(hash);
  console.log(email);
  records.viewRecords(app,email,hash).then((docs)=>{
    res.send(docs);
  }).catch((err)=>{
    res.send(err);
  })
});

router.post('/addMedicalRecord',(req,res)=>{

  addrcrd.addrecrd(app,req.body.email).then((status)=>{
    res.send(status);
  }).catch((err)=>{
    res.send(err);
  })

});

router.post('/saveMedicalRcrd',(req,res)=>{

  addrcrd.save(app,req.body,req.body.currenthash).then((status)=>{
    res.send(status);
  }).catch((err)=>{
    res.send(err);
  });

});

router.post('/search',(req,res)=>{

  console.log(req.body);
  find.search(req.body.search).then((docs)=>{
    res.send((docs));
  }).catch((err)=>{
    res.send(err);
  });


});


module.exports = router;
