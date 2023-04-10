var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('products', { title: 'Products' });
});

router.post('/add', function(req, res) {
  res.redirect('/');
});

module.exports = router;