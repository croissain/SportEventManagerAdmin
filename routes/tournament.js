const express = require('express');
const router = express.Router();

const TournamentController = require('../controllers/TournamentController');

router.get('/', TournamentController.showTournament);
router.get('/add', TournamentController.addTournament);


module.exports = router;
