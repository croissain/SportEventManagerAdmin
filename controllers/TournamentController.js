
const TournamentService = require('../services/TournamentService');
const TeamService = require('../services/TeamService');
const MatchService = require("../services/MatchService");


class TournamentController {
    showTournamentList = async(req, res, next) => {

        const data = req.query;

        const filter = {
            tournamentId: data.tournamentId,
            tournamentName: (data.tournamentName !== "0") ? data.tournamentName : undefined
        }

        const page = parseInt(data.page) || 1;
        const limit = parseInt(data.limit) || 10;

        const tournamentNames = await TournamentService.findAllTournamentNames()

        const allTournaments = await TournamentService.findAllTournamentsAndCount(filter, page, limit);
        const tournaments = allTournaments.rows;
        const count = allTournaments.count;

        const pagination = {
            page: page,
            limit: limit,
            totalRows: count
        }

        res.render('tournament/tournamentList', {
            title: 'tournament',
            tournaments, pagination, tournamentNames, filter
        });
    }

    showTournament = async(req, res, next) => {

        const id = req.params.id;


        const teams = await TeamService.findAllTeamsByTournamentId(id, true);
        const tournament = await TournamentService.findTournamentById(id, true);

        const deadline =  new Date(tournament.HanCuoiDangKy);
        const now = new Date();
        let isDeadlineTournament = undefined;
        if (now.getTime() >= deadline.getTime()) {
            isDeadlineTournament = true;
        }
        // const data = req.query;
        //
        // const filter = {
        //     tournamentId: data.tournamentId,
        //     tournamentName: (data.tournamentName !== "0") ? data.tournamentName : undefined
        // }
        //
        // const page = parseInt(data.page) || 1;
        // const limit = parseInt(data.limit) || 10;
        //
        // const tournamentNames = await TournamentService.findAllTournamentNames()
        //
        // const allTournaments = await TournamentService.findAllTournamentsAndCount(filter, page, limit);
        // const tournaments = allTournaments.rows;
        // const count = allTournaments.count;
        //
        // const pagination = {
        //     page: page,
        //     limit: limit,
        //     totalRows: count
        // }

        res.render('tournament/tournamentItem', {
            title: 'tournament details',
            // tournaments, pagination, tournamentNames, filter
            teams, tournament, isDeadlineTournament
        });
    }

    addTournament = async(req, res, next) => {

        const {tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam, tournamentDeadline} = req.query;
        const tournament = await TournamentService.addTournament(tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam, tournamentDeadline);

        res.redirect('/tournament');
    }

    editTournament = async(req, res, next) => {

        const {editID, tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam, tournamentDeadline} = req.query;
        const tournament = await TournamentService.editTournament(editID, tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam, tournamentDeadline);

        res.redirect('/tournament');
    }

    deleteTournament = async(req, res, next) => {
        const id = req.query.deleteID;
        console.log("delete id: ", id);
        const deleteTournament = await TournamentService.deleteTournamentByIds(id);
        res.redirect('/tournament');
    }

    deleteAllSelectedTournament = async(req, res, next) => {
        const idOptions = req.query.idOptions;
        console.log("delete all id: ", idOptions);
        const deleteTournament = await TournamentService.deleteTournamentByIds(idOptions);
        res.redirect('/tournament');
    }

    showSchedulePage = async(req, res, next) => {
        const id = req.params.id;
        const tournament = await TournamentService.findTournamentById(id, true);
        const matches = await MatchService.findAllMatchByTournamentId(id);
        res.render('tournament/tournamentSchedule', {
            title: 'tournament schedule',
            tournament,
            matches

        });
    }

    schedule  = async(req, res, next) => {
        const id = req.params.id;

        const schedule =  await TournamentService.scheduleByTournamentId(id);


        if(schedule.success){
            if(schedule.winner){
                res.redirect("/tournament/" + id + "/schedulePage");
            }
            res.redirect("/tournament/" + id + "/schedulePage");
        }
        //Xử lý không xếp lịch được
        else{
            res.redirect("/tournament/" + id + "/schedulePage");
        }
    }

    showResultPage = async(req, res, next) => {
        const id = req.params.id;
        const tournament = await TournamentService.findTournamentById(id, true);
        const matches = await MatchService.findAllMatchByTournamentId(id);
        res.render('tournament/tournamentResult', {
            title: 'tournament schedule',
            tournament,
            matches
        });
    }

    updateResult = async(req, res, next) => {
        const id = req.params.id;
        const matchId = req.query.matchId;
        const team1Goal = req.query.team1Goal;
        const team2Goal = req.query.team2Goal;

        if(parseInt(team1Goal) === parseInt(team2Goal)){
            const winTeam = req.query.winTeam;
            await MatchService.updateResult(matchId, team1Goal, team2Goal, winTeam);
        }else {
            await MatchService.updateResult(matchId, team1Goal, team2Goal);
        }




        res.redirect("/tournament/" + id + "/resultPage");
    }
}

module.exports = new TournamentController;