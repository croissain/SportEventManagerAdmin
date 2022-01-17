const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.deleteMatchDetailByMatchIds = async(matchIds) => {
    try{
        const deletePlayers = await models.BanThang.destroy({
            where: {
                MaTD: matchIds
            }
        });
        return true;
    }catch (e) {
        return false;
    }
}

exports.deleteAllMatchDetailByMatchIds = async(matchIds) => {
    try{
        const deleteMatchDetails = await models.ChiTietTD.destroy({
            where: {
                MaTD: matchIds
            }
        });
        return true;
    }catch (e) {
        return false;
    }
}