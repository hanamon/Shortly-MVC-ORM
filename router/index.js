const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // [이해 불가] : res.render 찾아보기
  res.render('index', { title: 'Express' });
});

module.exports = router;
