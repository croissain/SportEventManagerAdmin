const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const PlayerService = require('../services/PlayerService')

exports.findAllTeamsByTournamentId = async (tournamentId, raw = false) => {
    try{
        const teams = await models.DoiBong.findAll({
            where: ({MaGD: tournamentId}),
            raw: raw
        });
        return teams;
    }catch (e){
        console.log(e);
        return false;
    }
}

exports.findAndCountAllTeamsByTournamentId = async (tournamentId, raw = false) => {
    return await models.DoiBong.findAndCountAll({
        where: {
            MaGD: tournamentId
        },
        raw: raw,
    })
}

exports.findAndCountAllTeamsByIds = async (teamIds, raw = false) => {
    return await models.DoiBong.findAndCountAll({
        where: {
            MaDB: teamIds
        },
        raw: raw,
    })
}

exports.findAllTeamIdsByTournamentId = async (tournamentId, raw = false) => {
    const teamIds = await models.DoiBong.findAll({
        where: ({MaGD: tournamentId}),
        attributes: ['MaDB'],
    });

    return teamIds.map(function (current) {
        return current.MaDB;
    });
}


exports.findAllTeams = async(raw = false) => {
    return await models.DoiBong.findAll({
        raw: raw
    });
}



exports.findAllTeamNames = async() => {
    return await models.DoiBong.findAll({
        raw: true,
        attributes: [
            "TenDB"
        ]
    });
}

exports.findAllTeamsAndCount = async(filter, page, limit) => {

    let options = {
        include:
            [
                {
                    model: models.GiaiDau,
                    as: "MaGD_GiaiDau",
                    where: {

                    }
                },
            ],
        offset: (page - 1) * limit,
        limit: limit,
        order: [
            ['MaDB', 'ASC'],
        ],
        where: {
        },
        raw: true
    }

    if(filter.teamId){
        options.where.MaDB = filter.teamId;
    }

    if(filter.userId){
        options.where.MaNDK = filter.userId
    }

    if(filter.teamName){
        options.where.TenDB = filter.teamName;
    }

    if(filter.tournamentName){
        options.include[0].where.TenGD = filter.tournamentName;
    }

    console.log(options.where);

    try{
        const teams = await models.DoiBong.findAndCountAll(options);
        return teams;
    }catch (e){
        return false;
    }

}

exports.findTeamById = async (id) => {
    return await models.DoiBong.findOne({
        where: {
            MaDB: id
        },
        raw: true,
    });
}

exports.deleteTeamByIds = async(ids) => {
    try{
        const deletePlayers = await PlayerService.deletePlayerByTeamIds(ids);
        const deleteTeam = await models.DoiBong.destroy({
            where: {
                MaDB: ids
            }
        });
        return true;
    }catch (e){
        return false;
    }
}

exports.deleteAllTeamByTournamentId = async(tournamentId) => {
    try{

        const teamIds = await this.findAllTeamIdsByTournamentId(tournamentId);
        await PlayerService.deletePlayerByTeamIds(teamIds);

        const deleteTeams = await models.DoiBong.destroy({
            where: {
                MaGD: tournamentId
            }
        });
        return true;
    }catch (e){
        return false;
    }
}

exports.findAndCountAllMembers = async (filter) => {
    let options = {
        
        order: [
            ['MaCT', 'ASC'],
        ],
        where: {
        },
        raw: true
    }

    if(filter.teamid){
        options.where.MaDB = filter.teamid;
    }

    if(filter.playerId){
        options.where.MaCT = filter.playerId
    }

    if(filter.playerName){
        options.where.TenCT = { [Op.iLike]: `%${filter.playerName}%` };
    }

    console.log(options.where);

    try{
        const members = await models.CauThu.findAndCountAll(options);
        return members;
    }catch (e){
        console.log(e)
        return false;
    }
}