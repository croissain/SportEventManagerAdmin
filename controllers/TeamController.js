
const TeamService = require('../services/TeamService');
const TournamentService = require('../services/TournamentService');

class TeamController {
    showTeam = async(req, res, next) => {

        const data = req.query;

        const filter = {
            teamId: data.teamId,
            userId: data.userId,
            teamName: (data.teamName !== "0") ? data.teamName : undefined,
            tournamentName: (data.tournamentName !== "0") ? data.tournamentName : undefined
        }

        const page = parseInt(data.page) || 1;
        const limit = parseInt(data.limit) || 10;

        const teamNames = await TeamService.findAllTeamNames();
        const tournamentNames = await TournamentService.findAllTournamentNames()

        const allTeams = await TeamService.findAllTeamsAndCount(filter, page, limit);
        const teams = allTeams.rows;
        const count = allTeams.count;

        const pagination = {
            page: page,
            limit: limit,
            totalRows: count
        }

        res.render('team', {
            title: 'teams',
            teams, pagination, teamNames, tournamentNames, filter

        });
    }

    deleteTeam = async(req, res, next) => {
        const id = req.query.deleteID;
        console.log("delete id: ", id);
        // const deleteTeam = await TeamService.deleteTeamById(id);
        res.redirect('/team');
    }

    deleteAllSelectedTeam = async(req, res, next) => {
        const options = req.query.options;
        console.log("delete all id: ", options);
        // const deleteTeam = await TeamService.deleteTeamById(id);
        res.redirect('/team');
    }

}

module.exports = new TeamController;