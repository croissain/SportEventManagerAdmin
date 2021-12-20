const express = require('express');
const router = express.Router();

const TeamController = require('../controllers/TeamController');

router.get('/', TeamController.showTeam);
router.get('/delete', TeamController.deleteTeam);
router.get('/deleteAll', TeamController.deleteAllSelectedTeam);


module.exports = router;
