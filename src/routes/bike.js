const express = require('express');
const router = express.Router();
const bikeController = require('../controllers/bikeController');

router.get('/', bikeController.getAll);

module.exports = router;
