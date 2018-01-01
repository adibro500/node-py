var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbCons = require("./constants/db-constants");
var apiCons = require("./constants/api-constants");
var cors = require('cors');
var hindi = require("./langs/hindi.json");
var english = require("./langs/en.json");
var gujarati = require("./langs/guj.json");


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

app.use(bodyParser.urlencoded({extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res,err){
res.send("welcome to express");


});



var db;
MongoClient.connect(dbCons.MONGO_URL, (err, database) => {
  if (err) return console.log(err)
  else{
    console.log("db done.....");
    db = database;

  }
 
})







// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });
  
//   // error handler
//   app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });
  

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });

app.get("/",(req,res,err)=>{
if(err)
return res.send(err);
else  
return res.send("welcome express!");

})


  app.post("/authenticate/login", function(req, res, err) {
    db.collection('login_info').findOne({ "username": req.body.username}, function(err, user) {
      console.log('User found ',req.body);
      console.log('User found ',req.body.username);
      
      // In case the user not found  
      console.log("pass",req.body.password);
      if(err) {
        console.log('THIS IS ERROR RESPONSE');
        return res.json({"data":"valid"});
      } 
      else if (user!=null && user.password == req.body.password){
        console.log('User and password is correct');
        return res.json({"data":"valid"});
      } else {
        console.log("Credentials wrong");
        return res.json({"data":"invalid"});
      }              
  });
  })
  app.post('/save/customer', function(req, res) {
    // Insert JSON straight into MongoDB
    db.collection('customer_info').save(req.body, function (err, result) {
       if (err)
         return res.send({'status':'Error'});
       else
         return res.send({'status':'Success','id':result._id});
 
   });
 });


  app.get("/get/food",function(req,res){
    console.log("innnnn");
    db.collection('food_info').find().toArray((err, result) => {
      if (err) return console.log(err)
  else    
    return  res.json(result);
      
    })
  
  
  });

  app.get("/get/customer",function(req,res){
    console.log("innnnn");
    var addr = [];
    db.collection('customer_info').find().toArray((err, results) => {
      if (err) return console.log(err)
  else    {
    
     console.log(results["house address"]);
    return  res.json(results);
   
   
  }
 
    
      
    })
  
  
  });


app.get('/cust/:mob',function(req,res){
db.collection('customer_info').findOne({$or:[{"mobile number 1":req.params.mob},{"mobile number 2":req.params.mob},{"mobile number 3":req.params.mob}]},function(err,result){
if(err)
return console.log(err);
else
return res.json(result);

})

})

app.get('/get/customer/:addr',function(req,res){
  console.log(req.params.addr);
  db.collection('customer_info').findOne({$or:[{"house address":req.params.addr},{"flat address":req.params.addr}]},function(err,result){
  if(err)
  return console.log(err);
  else
  return res.json(result);
  
  
  })
  
  })




  app.get("/get/customers",function(req,res){
    console.log("innnnn");
    db.collection('customer_info').find().toArray((err, result) => {
      if (err) return console.log(err)
  else    
      return res.json(result);
      
    })
  
  
  });