
const TournamentService = require('../services/TournamentService');

class TournamentController {
    showTournament = async(req, res, next) => {
        const tournaments = await TournamentService.findAllTournaments();
        res.render('tournament', {
            title: 'tournament',
            tournaments,
        });
    }

    addTournament = async(req, res, next) => {

        const {tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam} = req.query;
        const tournament = await TournamentService.addTournament(tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam);

        res.redirect('/tournament');
    }

    editTournament = async(req, res, next) => {

        const {editID, tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam} = req.query;
        const tournament = await TournamentService.editTournament(editID, tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam);

        res.redirect('/tournament');
    }
}

module.exports = new TournamentController;