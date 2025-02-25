const express = require('express');
const router = express.Router();
const CropController = require('../controller/Crop');
router.post('/create', CropController.create);

module.exports = router;