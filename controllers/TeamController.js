
const TeamService = require('../services/TeamService');

class TeamController {
    showTeam = async(req, res, next) => {

        const data = req.query;
        const page = data.page || 1;
        const limit = data.limit || 10;

        const allTeams = await TeamService.findAllTeamsAndCount();
        const teams = allTeams.rows;
        const count = allTeams.count;

        const pagination = {
            page: page,
            limit: limit,
            totalRows: count
        }

        res.render('team', {
            title: 'teams',
            teams, pagination
        });
    }
}

module.exports = new TeamController;