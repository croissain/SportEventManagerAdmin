const express = require('express');
const router = express.Router();

const TeamController = require('../controllers/TeamController');

router.get('/', TeamController.showTeam);


module.exports = router;
