var express = require('express');
var router = express.Router();

var {check,validationResult} = require('express-validator')
//connect
var mongodb = require('mongodb');
var db = require('monk')('127.0.0.1:27017/BlogDB')

/* GET home page. */
router.get('/', function(req, res, next) {
  var blogs=db.get('posts')
  blogs.find({},{},function(err,blog){
    if(err) throw err
    res.render('index',{posts:blog});
  })
  
});

router.get('/category/add', function(req, res, next) {
   res.render('addcategory');
});

router.post('/category/add', [
  check('name', 'ชื่อประเภทต้องไม่เป็นค่าว่าง').not().isEmpty()
], function(req, res, next) {
  var result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render('addcategory', {errors: errors});
  }
  res.render('addcategory') 
});


module.exports = router;
