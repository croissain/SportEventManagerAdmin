const {models} = require('../models');
const Sequelize = require('sequelize');
const {where} = require("sequelize");
const PlayerService = require("../services/PlayerService");
const Op = Sequelize.Op;

exports.findAllStateByTournamentId = async (tournamentId, raw = false) => {
    return models.VongDau.findAll({
        where: {
            MaGD: tournamentId
        },
        raw: raw
    })
}

exports.findLatestStateByTournamentId = async (tournamentId, raw = false) => {

    const maxId = await models.VongDau.findOne({
        where: {
            MaGD: tournamentId
        },
        attributes: [
            Sequelize.fn('MAX', Sequelize.col('MaVD'))
        ],
        raw: raw
    })

    if(maxId.max){
        const state = await models.VongDau.findOne({
            where: {
                MaGD: tournamentId,
                MaVD: maxId.max
            },
        })

        return state;
    }
    return false;

}

exports.createState = async (tournamentId, name) => {
    try{
        const maxId = await models.VongDau.findOne({
            where: {
                MaGD: tournamentId
            },
            attributes: [
                Sequelize.fn('MAX', Sequelize.col('MaVD'))
            ],
            raw: true
        })

        let nextId;

        if(maxId.max){
            let idNumber = maxId.max.substring(2, 5);
            let nextIdInt = (parseInt(idNumber) + 1);

            if(nextIdInt > 0 && nextIdInt < 10){
                nextId = 'VD' + '00' + nextIdInt;
            }
            else if(nextIdInt >= 10 && nextIdInt < 100){
                nextId = 'VD' + '0' + nextIdInt;
            }
            else {
                nextId = 'VD' + nextIdInt;
            }
        }
        else {
            nextId = "VD001"
        }

        const name = 'Vong dau' + nextId;
        const state = await models.VongDau.create({
            MaGD: tournamentId,
            MaVD: nextId,
            TenVD: name
        })
        return state;

    }catch (e){
        console.log(e);
        return false;
    }

}


exports.isEndOfState = async (tournamentId, stateID) => {
    try{
        //Tìm số trận đấu có        MaGD: tournamentId,  MaVD: stateID,
        //và đã chưa có độ thắng
        const matchs = await models.TranDau.findAll({
            where: {
                MaGD: tournamentId,
                MaVD: stateID,
                DoiThang: null
            },
            raw: true
        })

        const countMatchs = matchs.length;

        //Nếu số trận đấu (chưa có dội thắng) là 0 nghĩa là vòng đấu kết thúc
        if(countMatchs === 0){
            return true;
        }
        else{
            return false;
        }
    }catch (e) {
        console.log(e);
        return false;
    }
}

exports.deleteAllStateByTournamentId = async(tournamentId) => {    try{

        // const stateIds = await this.findAllTeamIdsByTournamentId(tournamentId);

        const deleteStates = await models.VongDau.destroy({
            where: {
                MaGD: tournamentId
            }
        });
        return true;
    }catch (e){
        return false;
}
}