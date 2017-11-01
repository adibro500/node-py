var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cors = require('cors');

var app = express();

app.use(cors());

const MongoClient = require('mongodb').MongoClient;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res,err){
res.send("welcome to express");


});



var db;
//mongodb://<dbuser>:<dbpassword>@ds133378.mlab.com:33378/kleveron
MongoClient.connect('mongodb://root:root@ds133378.mlab.com:33378/kleveron', (err, database) => {
  if (err) return console.log(err)
  else{
    console.log("db done.....");
    db = database;

  }
 
})

app.post('/api/login/', function(req, res) {
  db.collection('logins').findOne({ username: req.body.username}, function(err, user) {
    console.log('User found ',req.body);
    // In case the user not found  
    if(err) {
      console.log('THIS IS ERROR RESPONSE');
      res.json(err);
    } 
    if (user.password === req.body.password){
      console.log('User and password is correct');
      res.json(user);
    } else {
      console.log("Credentials wrong");
      res.json({data: "Login invalid"});
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

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
