const { models } = require('../models');
const Sequelize = require('sequelize');
const GoalService = require('../services/GoalService');
const MatchDetailService = require('../services/MatchDetail');

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

exports.createMatch = async (match_id, team1_id, team2_id, location, start_time, start_date) => {
    return await models.TranDau.create({
        MaTD: match_id,
        MaDB1: team1_id,
        MaDB2: team2_id,
        MaSD: location,
        GioBatDau: start_time,
        NgThiDau: start_date,
    });
}

exports.findAllMatch = async () => {
    return await models.TranDau.findAll({
        raw: true,
    });
}

exports.findMatchById = async (id) => {
    return await models.TranDau.findOne({
        where: {
            MaTD: id,
        },
        raw: true,
    });
}