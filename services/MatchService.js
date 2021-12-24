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