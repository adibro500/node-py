var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbCons = require("./constants/db-constants");
var apiCons = require("./constants/api-constants");
var cors = require('cors');
var multer = require("multer");


var app = express();

app.use(cors());

const MongoClient = require('mongodb').MongoClient;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res,err){
res.send("welcome to express");


});



var db;
//mongodb://<dbuser>:<dbpassword>@ds133378.mlab.com:33378/kleveron
MongoClient.connect(dbCons.MONGO_URL, (err, database) => {
  if (err) return console.log(err)
  else{
    console.log("db done.....");
    db = database;

  }
 
})

app.post(apiCons.POST_LOGIN_API, function(req, res, err) {
  db.collection('logins').findOne({ username: req.body.username}, function(err, user) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
    if (user!=null && (user.password === req.body.password)){
      console.log('User and password is correct');
      res.json({"data":"valid"});
    } else {
      console.log("Credentials wrong");
      res.json({"data":"invalid"});
    }              
});
})



// app.post('/api/login/', function(req, res) {
//   console.log('Req body in login ', req.body)
//   //console logs correctly as { username: bob, password: 123 }
//   db.collection('users').find(req.body).next(function(err, isMatch) {
//     console.log('ISMATCH IS: ' + isMatch)
//     if(err) {
//       console.log('THIS IS ERROR RESPONSE')
//       res.json(err)
//     } else {
//       console.log('THIS IS ISMATCH RESPONSE')
//       res.json(isMatch)
//     }
//   })
// })
app.post(apiCons.POST_ADMIN_INPUT_MASTER,function(req,res){
  console.log("innnnn");
  db.collection('adminInputMasterTemplates').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })


});

app.get(apiCons.GET_INPUT_MASTER, function(req, res, err) {
  db.collection('adminInputMasterTemplates').find({ "user": "ravi"}).toArray( function(err, users) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
    // if (user!=null && (user.password === req.body.password)){
    //   console.log('User and password is correct');
    //   res.json(user);
    // }
     else {
      console.log("Credentials wrong");
      res.send(users);
    }              
});
})

app.post("/save/admin-list-master",function(req,res){
  console.log("innnnn");
  db.collection('saveGridMaster').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })


});


app.get("/get/admin-grid-master", function(req, res, err) {
  db.collection('saveGridMaster').find({ "user": "ravi"}).toArray( function(err, users) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
    // if (user!=null && (user.password === req.body.password)){
    //   console.log('User and password is correct');
    //   res.json(user);
    // }
     else {
      console.log("Credentials wrong");
      res.send(users);
    }              
});
})



//POST_FORM_ADMIN_INPUT_MASTER
app.post(apiCons.POST_FORM_ADMIN_INPUT_MASTER,function(req,res){
  console.log("innnnn");
  db.collection('adminInputMaster_form_inputs').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })


});

app.post("/save/admin2",function(req,res){
  console.log("innnnn");
  db.collection('admin2inputs').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })


});

app.post("/save/admin-input2",function(req,res){
  console.log("innnnn");
  db.collection('admin2').save(req.body, (err, result) => {
    if (err) return console.log(err)
else    
    console.log('saved to database')
    
  })


});



// app.post("/savelist/adminInputMaster",function(req,res){
//   console.log("innnnn");
//   db.collection('adminInputMasterTemplate_list').save(req.body, (err, result) => {
//     if (err) return console.log(err)
// else    
//     console.log('saved to database')
    
//   })


// });


app.get("/getlist/admin-input-master",function(req,res){
  db.collection('adminInputMasterTemplate_list').find({ "user": "ravi"}).toArray( function(err, users) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
   
     else {
      console.log("Credentials wrong");
      res.send(users);
    }
                  
});


});

app.get("/get/admin2",function(req,res){
  db.collection('admin2').find({ "User": "Aditya"}).toArray( function(err, users) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
   
     else {
      console.log("Credentials wrong");
      res.send(users);
    }
                  
});


});

// var DIR = './uploads/';

// var upload = multer({dest: DIR});



// app.use(multer({
//  dest: DIR,
//  rename: function (fieldname, filename) {
//    return filename + Date.now();
//  },
//  onFileUploadStart: function (file) {
//    console.log(file.originalname + ' is starting ...');
//  },
//  onFileUploadComplete: function (file) {
//    console.log(file.fieldname + ' uploaded to  ' + file.path);
//  }
// }));

// app.get('/upload1', function (req, res) {
//  res.end('file catcher example');
// });

// app.post('/upload2', function (req, res) {
//  upload(req, res, function (err) {
//    if (err) {
//      return res.end(err.toString());
//    }

//    res.end('File is uploaded');
//  });
// });






app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
