const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.redirect('../users/dashboard')
});

module.exports = router;