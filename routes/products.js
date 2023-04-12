var express = require('express');
var router = express.Router();
var Product = require('../models/mdProduct');
var mongoose = require('mongoose');
import {srv} from '../helpers/server-address';//My own server
// import {srv} from '../helpers/srv-adress';

mongoose.connect(srv);

/* GET home page. */
router.get('/',async function(req, res) {
  const products = await Product.find().lean();
  res.render('products', { title: 'Products', products: products });
});

router.post('/add',async function(req, res) {
  try {
    if(Product.exists({ productID: req.body.productID })) throw new Error('productID already existed')
    const product = await Product.create({
      productID: req.body.productID,
      name: req.body.name,
      price: req.body.price,
      color: req.body.color,
      quantity: req.body.quantity,
      type: req.body.type,
      customerID: req.body.customerID,
      customerName: req.body.customerName,
    });
    console.log(product);
  } catch(e) {
    console.log('Hmm sussy at Product.create()');
    console.log(e);
  }
  res.redirect('/products');
});

router.post('/edit/:_id',async function(req,res){
  const product = await Product.findById(req.params._id).lean();
  console.log(product);
  res.render('editProduct',{ title: 'Product Editor', product: product });
})

router.post('/delete/:_id',function(req,res){
  Product.deleteOne({ _id: req.params._id })
  .then(() => {
    res.redirect('/products');
  })
  .catch(e => console.log(e));
})

router.post('/editProduct',async function(req,res){
  const product = await Product.findOne({ _id: req.params._id });
  res.redirect('/products');
})

module.exports = router;