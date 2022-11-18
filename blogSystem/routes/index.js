var express = require('express');
var router = express.Router();

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

module.exports = router;
