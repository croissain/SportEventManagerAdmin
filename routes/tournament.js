const express = require('express');
const router = express.Router();

const TournamentController = require('../controllers/TournamentController');
const TeamController = require("../controllers/TeamController");

router.get('/', TournamentController.showTournamentList);
router.get('/add', TournamentController.addTournament);
router.get('/edit', TournamentController.editTournament);
router.get('/delete', TournamentController.deleteTournament);
router.get('/deleteAll', TournamentController.deleteAllSelectedTournament);
router.get('/:id',TournamentController.showTournament);
router.get('/:id/schedulePage',TournamentController.showSchedulePage);
router.get('/:id/schedule',TournamentController.schedule);



module.exports = router;
