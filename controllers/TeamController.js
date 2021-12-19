
const TeamService = require('../services/TeamService');

class TeamController {
    showTeam = async(req, res, next) => {
        const teams = await TeamService.findAllTeams();
        res.render('team', {
            title: 'teams',
            teams,
        });
    }
}

module.exports = new TeamController;