const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.findPlayerById = async(id, raw = false) => {
    return await models.CauThu.findAll({
        raw: raw,
        where: {
            MaCT: id
        }
    });
}

exports.findPlayerByTeamId = async(teamId, raw = false) => {
    return await models.CauThu.findAll({
        raw: raw,
        where: {
            MaDB: teamId
        }
    });
}

exports.deletePlayerById = async(id) => {
    try{
        const deletePlayer = await models.CauThu.destroy({
            where: {
                MaCT: id
            }
        });
        return true;
    }catch (e) {
        return false;
    }
}

exports.deletePlayerByTeamIds = async(teamIds) => {
    try{
        const deletePlayers = await models.CauThu.destroy({
            where: {
                MaDB: teamIds
            }
        });
        return true;
    }catch (e) {
        return false;
    }
}
