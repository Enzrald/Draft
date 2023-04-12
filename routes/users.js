var express = require('express');
var router = express.Router();
var User = require('../models/mdUser');
var mongoose = require('mongoose');
import {srv} from '../helpers/server-address';//My own server
// import {srv} from '../helpers/srv-adress';

mongoose.connect(srv);

/* GET users listing. */
router.get('/',async function(req, res) {
  const users = await User.find().lean();
  res.render('users',{ title: 'Users', users: users });
});

router.post('/add',async function(req, res) {
  try {
    if(req.body.password != req.body.rePassword) throw new Error('Password not match');
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
      image: req.body.image,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
  } catch(e) {
    console.log('Hmm sussy at User.create()');
    console.log(e);
  }
  res.redirect('/users');
});

router.post('/edit/:id',function(req,res){
  res.redirect('/users');
})

router.post('/delete/:_id',function(req,res){
  User.deleteOne({ _id: req.params._id })
  .then(() => {
    res.redirect('/users');
  })
  .catch(e => console.log(e));
})

module.exports = router;
