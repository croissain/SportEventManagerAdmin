const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const PlayerService = require('../services/PlayerService')

exports.findAllTeamsByTournamentId = async (tournamentId, raw = false) => {
    const teams = await models.DoiBong.findAll({
        where: ({MaGD: tournamentId}),
        raw: raw
    });
    return teams;
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

exports.findAndCountAllTeams = async () => {
    return await models.DoiBong.findAndCountAll({
        raw: true,
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


    try{
        const teams = await models.DoiBong.findAndCountAll(options);
        return teams;
    }catch (e){
        return false;
    }

}

exports.findTeamById = async (id, raw = false) => {
    return await models.DoiBong.findOne({
        raw: raw,
        where: {
            MaGD: id
        }
    });
}

exports.deleteTeamById = async(id) => {
    try{
        const deletePlayers = await PlayerService.deletePlayerByTeamId(id);
        const deleteTeam = await models.DoiBong.destroy({
            where: {
                MaDB: id
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