const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const PlayerService = require('../services/PlayerService')

exports.findAllTeams = async() => {
    return await models.DoiBong.findAll({
        raw: true
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