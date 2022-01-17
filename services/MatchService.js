const { models } = require('../models');
const Sequelize = require('sequelize');
const GoalService = require('../services/GoalService');
const MatchDetailService = require('../services/MatchDetail');
const TeamService = require('../services/TeamService');
const PlayerService = require("../services/PlayerService");

const Op = Sequelize.Op;


exports.findAllMatchIdsByTeamIds = async(teamIds, raw = false) => {
    const matchIds = await models.TranDau.findAll({
        where: {
            [Op.or]: [
                {MaDB1: teamIds},
                {MaDB2: teamIds}
            ]
        },
        attributes: ['MaTD'],
    });

    return matchIds.map(function (current) {
        return current.MaTD;
    });
}


exports.deleteAllMatchByTeamIds = async(teamIds) => {

    const matchIds = await this.findAllMatchIdsByTeamIds(teamIds);

    await GoalService.deleteGoalByMatchIds(matchIds);
    await MatchDetailService.deleteMatchDetailByMatchIds(matchIds);

    try{
        const deleteMatchs = await models.TranDau.destroy({
            where: {
                MaTD: matchIds
            }
        });
        return true;
    }catch (e){
        return false;
    }
}

exports.createMatch = async (team1_id, team2_id, location, start_time, start_date, tournamentId, stateId) => {

    const maxId = await models.TranDau.max('MaTD');
    let nextId;

    if (maxId) {
        let idNumber = maxId.substring(2, 5);
        let nextIdInt = (parseInt(idNumber) + 1);

        if(nextIdInt > 0 && nextIdInt < 10){
            nextId = 'TD' + '00' + nextIdInt;
        }
        else if(nextIdInt >= 10 && nextIdInt < 100){
            nextId = 'TD' + '0' + nextIdInt;
        }
        else{
            nextId = 'TD' + nextIdInt;
        }
    }
    else {
        nextId = "TD001";
    }

    return await models.TranDau.create({
        MaTD: nextId,
        MaDB1: team1_id,
        MaDB2: team2_id,
        MaSD: location,
        GioBatDau: start_time,
        NgThiDau: start_date,
        MaGD: tournamentId,
        MaVD: stateId
    });
}

exports.findAllMatch = async () => {
    return await models.TranDau.findAll({
        raw: true,
    });
}

exports.findAllMatchByTournamentId = async (tournamentId) => {
    return await models.TranDau.findAll({
        where: {
            MaGD: tournamentId
        },
        raw: true,
        order: [
            ['MaVD', 'ASC'],
            ['MaTD', 'ASC']
        ]
    });
}

exports.findAllMatchByTournamentIdAndStateId = async (tournamentId, stateId, raw = false) => {
    return await models.TranDau.findAll({
        where: {
            MaGD: tournamentId,
            MaVD: stateId
        },
        raw: raw,
    });
}


exports.findMatchById = async (id, raw = false) => {
    return await models.TranDau.findOne({
        where: {
            MaTD: id,
        },
        raw: raw,
    });
}

exports.findAndCountAllWinTeamsByTournamentIdAndStateId = async (tournamentId, stateId, raw = false) => {
    const winTeam = await models.TranDau.findAll({
        where: {
            MaGD: tournamentId,
            MaVD: stateId
        },
        attribute: [
            'DoiThang'
        ],
        raw: true,
    });

    const winTeamIds = winTeam.map(function (current) {
        return current.DoiThang;
    });

    try{
        const teams = await TeamService.findAndCountAllTeamsByIds(winTeamIds, true);
        return teams;
    }catch (e){
        console.log(e);
        return false;
    }
}

exports.findAndCountAllTeamsByTournamentId = async (tournamentId, raw = false) => {
    const allTeams = await models.DoiBong.findAndCountAll({
        where: {
            MaGD: tournamentId,
        },
        raw: true,
    });
    return allTeams;



}



exports.findLastestMatchTimeByTournamentId = async (tournamentId) => {
    const maxDate = await models.TranDau.findOne({
        where: {
            MaGD: tournamentId
        },
        attributes: [
            Sequelize.fn('MAX', Sequelize.col('NgThiDau'))
        ],
        raw: true
    })

    if(maxDate.max){
        return new Date(maxDate.max);
    }
    return new Date();
}

exports.updateWinTeamByMatchId = async (matchId, teamId) => {
    const match = await this.findMatchById(matchId);
    await match.update({
        DoiThang: teamId
    })
    await match.save();
    return match;
}

exports.updateResult = async (matchId, team1Goal, team2Goal, winTeamCode) => {
    const match = await this.findMatchById(matchId);



    const goal1 = parseInt(team1Goal);
    const goal2 = parseInt(team2Goal);
    let winTeam;

    if ( goal1 > goal2){
        winTeam = match.MaDB1;
    }
    else if ( goal1 < goal2){
        winTeam = match.MaDB2;
    }
    else{

        if(parseInt(winTeamCode) === 1){
            winTeam = match.MaDB1;
        }else if (parseInt(winTeamCode) ===2 ){
            winTeam = match.MaDB2;
        }

        // const index = Math.floor(Math.random() * 2);
        // if(index === 0){
        //     winTeam = match.MaDB1;
        // }else{
        //     winTeam = match.MaDB2;
        // }

    }


    await match.update({
        SoBanThangDB1: goal1,
        SoBanThangDB1: goal2,
        DoiThang: winTeam
    })
    await match.save();
    return match;
}

//Dùng hàm này để tạo dữ liệu ảo
exports.randomWinTeam = async (tournamentId, stateId) => {
    const matchs = await this.findAllMatchByTournamentIdAndStateId(tournamentId, stateId);

    try{
        for (let match of matchs){
            const teamId1 = match.MaDB1;
            if(!match.DoiThang){
                await match.update({
                    DoiThang: teamId1
                })
                await  match.save;
            }
        }
        return true;
    }catch (e){
        console.log(e);
        return false;
    }


}

exports.findAllMatchIdsByTournamentId = async(tournamentIds) => {

}


exports.findAllMatchIdsByTournamentId = async (tournamentId, raw = false) => {
    const matchIds = await models.TranDau.findAll({
        where: ({MaGD: tournamentId}),
        attributes: ['MaTD'],
    });

    return matchIds.map(function (current) {
        return current.MaTD;
    });
}


exports.deleteAllMatchByTournamentIds = async(tournamentIds) => {
    try{

        // const teamIds = await this.findAllTeamIdsByTournamentId(tournamentId);
        // await PlayerService.deletePlayerByTeamIds(teamIds);


        const matchIds = await this.findAllMatchIdsByTournamentId(tournamentIds);

        const deleteMatchDetails = await MatchDetailService.deleteAllMatchDetailByMatchIds(matchIds);

        const deleteGoals = await GoalService.deleteAllGoalByMatchIds(matchIds);

        const deleteMatchs = await models.TranDau.destroy({
            where: {
                MaGD: tournamentIds
            }
        });
        return true;
    }catch (e){
        return false;
    }
}