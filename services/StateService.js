const {models} = require('../models');
const Sequelize = require('sequelize');
const {where} = require("sequelize");
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