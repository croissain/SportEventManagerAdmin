const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const TeamService = require('./TeamService')
const MatchService = require('../services/MatchService');
const StateService = require('../services/StateService');
const TeamServices = require("../services/TeamService");



exports.findAllTournaments = async() => {
    return await models.GiaiDau.findAll({
        raw: true
    });
}

exports.findAllTournamentsAndCount = async(filter, page, limit) => {

    let options = {
        offset: (page - 1) * limit,
        limit: limit,
        order: [
            ['MaGD', 'ASC'],
        ],
        where: {
        },
        raw: true
    }

    if(filter.tournamentId){
        options.where.MaGD = filter.tournamentId;
    }

    if(filter.tournamentName){
        options.where.TenGD = filter.tournamentName;
    }

    try{
        const tournaments = await models.GiaiDau.findAndCountAll(options);
        return tournaments;
    }catch (e){
        return false;
    }

}

exports.findAllTournamentNames = async() => {
    return await models.GiaiDau.findAll({
        raw: true,
        attributes: [
            "TenGD"
        ]
    });
}


exports.findTournamentById = async(id, raw = false) => {
    return await models.GiaiDau.findOne({
        raw: raw,
        where: {
            MaGD: id
        }
    });
}

exports.findTournamentByIds = async(ids, raw = false) => {
    return await models.GiaiDau.findOne({
        raw: raw,
        where: {
            MaGD: ids
        }
    });
}

exports.findTournamentByName = async(name) => {
    return await models.GiaiDau.findOne({
        raw: true,
        where: {
            TenGD: name
        }
    });
}


exports.addTournament = async (tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam, tournamentDeadline) => {
    const maxId = await models.GiaiDau.max('MaGD');

    let nextId;
    if (maxId) {
        let idNumber = maxId.substring(2, 5);
        let nextIdInt = (parseInt(idNumber) + 1);

        if(nextIdInt > 0 && nextIdInt < 10){
            nextId = 'GD' + '00' + nextIdInt;
        }
        else if(nextIdInt >= 10 && nextIdInt < 100){
            nextId = 'GD' + '0' + nextIdInt;
        }
        else{
            nextId = 'GD' + nextIdInt;
        }
    }
    else {
        nextId = "GD001";
    }

    try {
        const tournament = await models.GiaiDau.create(
            {
                MaGD: nextId,
                TenGD: tournamentName,
                DoTuoiTGNhoNhat: tournamentMinAge,
                DoTuoiTGLonNhat: tournamentMaxAge,
                SoDBThamGia: tournamentNumberTeam,
                HanCuoiDangKy: tournamentDeadline,
            }
        );
        return tournament;
    } catch (error) {
        return false;
    }
}


exports.editTournament = async (tournamentId, tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam, tournamentDeadline) => {

    const tournament = await this.findTournamentById(tournamentId);

    tournamentName = tournamentName ||  tournament.TenGD;
    tournamentMinAge = tournamentMinAge ||  tournament.DoTuoiTGNhoNhat;
    tournamentMaxAge = tournamentMaxAge ||  tournament.DoTuoiTGLonNhat;
    tournamentNumberTeam = tournamentNumberTeam ||  tournament.SoDBThamGia;
    tournamentDeadline = tournamentDeadline || tournament.HanCuoiDangKy;

    try {

        await tournament.update({
            TenGD: tournamentName,
            DoTuoiTGNhoNhat: tournamentMinAge,
            DoTuoiTGLonNhat: tournamentMaxAge,
            SoDBThamGia: tournamentNumberTeam,
            HanCuoiDangKy: tournamentDeadline,
        })

        await tournament.save();
        return tournament;

    } catch (error) {
        return false;
    }
}

exports.deleteTournamentByIds = async(tournamentIds) => {
    try{

        await MatchService.deleteAllMatchByTournamentIds(tournamentIds);
        await TeamService.deleteAllTeamByTournamentId(tournamentIds);
        await StateService.deleteAllStateByTournamentId(tournamentIds);
        const tournament = await this.findTournamentByIds(tournamentIds);
        tournament.destroy({
            where: {
                MaGD: tournamentIds
            }
        })
        return true;
    }catch (e) {
        console.log(e);
        return false;
    }


    // await MatchService.deleteAllMatchByTeamIds(teamIds);

    // const tournament = await this.findTournamentById(ids);
    // tournament.destroy({
    //     where: {
    //         MaGD: ids
    //     }
    // })
}


exports.scheduleByTournamentId = async (tournamentId) => {

    try{

        //Kiểm tra xem giải đấu có độ tham gia hay chưa
        const allTournamenTeams = await MatchService.findAndCountAllTeamsByTournamentId(tournamentId, true);

        if (allTournamenTeams.count === 0) {
            return {success: false};
        }

        const lastestState = await StateService.findLatestStateByTournamentId(tournamentId, true);
        //
        let matchs = new Array();

        //Nếu tồn tại lastestState, thì tìm vòng đấu tiếp theo,
        // Ngược lại nghĩa là tạo vòng đấu đầu tiên

        if(lastestState){
            const lastestStateId = lastestState.MaVD;

            const isEndOfState = await StateService.isEndOfState(tournamentId, lastestStateId);

            //Nếu vòng đấu mới nhát đã kết thúc tạo vòng đấu mới
            if(isEndOfState){
                const state = await StateService.createState(tournamentId);
                const stateId = state.MaVD;
                const teams = await MatchService.findAndCountAllWinTeamsByTournamentIdAndStateId(tournamentId, lastestStateId, true);

                //Chỉ còn 1 dội nghĩa là giải đấu kết thúc
                if(teams.count === 1){
                    const winner = teams[0];
                    return {success: true, winner};
                }

                await schedule(teams, tournamentId, stateId);
                return {success: true};

                // await MatchService.randomWinTeam(id, stateId);
            }
            //Ngược lại thì ko cho tạo lịch mới
            else {
                return {success: false};
            }
        }
        //lastestState.MaVD không tồn tại, do đó đây là vòng đấu đầu tiên
        else{
            //id là id của tournament
            const state = await StateService.createState(tournamentId);
            const stateId = state.MaVD;
            const teams = await TeamServices.findAndCountAllTeamsByTournamentId(tournamentId, true);
            await schedule(teams, tournamentId, stateId);

            // await MatchService.randomWinTeam(id, stateId);
            return {success: true};

        }

    }catch (e) {
        console.log(e);
        return {success: false};
    }

}

async function schedule(teams, tournamentId, stateId){
    // const teams = await TeamServices.findAndCountAllTeams();
    // console.log(teams.rows);

    const location = 'SD001';
    const matchs = new Array();

    //Nếu team lẻ thỉ ramdom 1 đội đc thắng
    const countTeam = teams.count;
    if (countTeam % 2 !== 0){
        const index = Math.floor(Math.random() * countTeam);
        const luckyTeam = teams.rows[index];
        const luckyTeamId = luckyTeam.MaDB;
        const match = await MatchService.createMatch(null, null, null, null, null, tournamentId, stateId);
        const matchId = match.MaTD;
        await MatchService.updateWinTeamByMatchId(matchId, luckyTeamId);
        //Xóa team đó ra khỏi danh sách chờ xếp lịch
        teams.rows.splice(index, 1);
        teams.count--;
        const rawMatch = await MatchService.findMatchById(matchId, true);
        matchs.push(rawMatch);
    }

    let splitAt = function (i, xs) {
        let a = xs.slice(0, i);
        let b = xs.slice(i, xs.length);
        return [a, b];
    };

    let shuffle = function (xs) {
        return xs.slice(0).sort(function () {
            return 0.5 - Math.random();
        });
    };

    let zip = function (xs) {
        return xs[0].map(function (_, i) {
            return xs.map(function (x) { return x[i]; })
        });
    };

    let results = zip(splitAt(teams.rows.length / 2, shuffle(teams.rows)));

    // let count = 0;
    let currDate = await MatchService.findLastestMatchTimeByTournamentId(tournamentId);
    // let currDate = new Date(2022,4,30);

    // result.forEach(async (match) => {
    for (let result of results)
    {
        try {
            let team1_id = result[0].MaDB;
            let team2_id = result[1].MaDB;

            // let match_id_count = parseInt(lastestMatch.slice(2)) + 1;
            // count++;
            // let match_id = "TD" + count;

            let start_time = "7:45 AM";
            currDate.setDate(currDate.getDate() + 1);
            let month = currDate.getUTCMonth() + 1;
            let day = currDate.getUTCDate();
            let year = currDate.getUTCFullYear();

            let start_date = year + "-" + month + "-" + day;
            console.log(team1_id, team2_id, start_time, start_date);

            const match = await MatchService.createMatch(team1_id, team2_id, location, start_time, start_date, tournamentId, stateId);
            const rawMatch = await MatchService.findMatchById(match.MaTD, true);
            matchs.push(rawMatch);
        } catch (err) { console.log(err) }
    }
    return matchs;
    // else if (teams.count % 2 !== 0) {
    //     let pairs = function (arr) {
    //         let res = [];
    //         let l = arr.length;
    //         for (let i = 0; i < l; ++i)
    //             for (let j = i + 1; j < l; ++j)
    //                 res.push([arr[i], arr[j]]);
    //         return res;
    //     }
    //
    //     let result = pairs(teams.rows);
    //
    //     let count = 0;
    //     let currDate = new Date();
    //
    //     result.forEach(async (match) => {
    //         try {
    //             let team1_id = match[0].MaDB;
    //             let team2_id = match[1].MaDB;
    //
    //             // let match_id_count = parseInt(lastestMatch.slice(2)) + 1;
    //             count++;
    //             let match_id = "TD" + count;
    //
    //             let start_time = "7:45 AM";
    //             currDate.setDate(currDate.getDate() + 1);
    //             let month = currDate.getUTCMonth() + 1;
    //             let day = currDate.getUTCDate();
    //             let year = currDate.getUTCFullYear();
    //
    //             let start_date = year + "-" + month + "-" + day;
    //             console.log(match_id, team1_id, team2_id, start_time, start_date);
    //
    //             await MatchService.createMatch(match_id, team1_id, team2_id, location, start_time, start_date);
    //         } catch (err) { console.log(err) }
    //     })
    // }

}
