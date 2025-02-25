const express = require('express');
const router = express.Router();
const AnimalController = require('../controller/Animal');
router.post('/create', AnimalController.create);

module.exports = router;