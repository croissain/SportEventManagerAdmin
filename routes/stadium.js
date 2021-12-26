const express = require('express');
const router = express.Router();
const StadiumController = require('../controllers/StadiumController');


router.get('/', StadiumController.showStadiumList);
router.get('/add', StadiumController.addStadium);


module.exports = router;