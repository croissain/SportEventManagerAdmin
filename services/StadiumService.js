const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.findAllStadiumsAndCount = async(filter, page, limit) => {

    let options = {
        offset: (page - 1) * limit,
        limit: limit,
        order: [
            ['MaSD', 'ASC'],
        ],
        where: {
        },
        raw: true
    }

    try{
        const stadiums = await models.SanDau.findAndCountAll(options);
        return stadiums;
    }catch (e){
        return false;
    }

}

exports.addStadium = async (stadiumAddress) => {
    const maxId = await models.SanDau.max('MaSD');

    let nextId;
    if (maxId) {
        let idNumber = maxId.substring(2, 5);
        let nextIdInt = (parseInt(idNumber) + 1);

        if(nextIdInt > 0 && nextIdInt < 10){
            nextId = 'SD' + '00' + nextIdInt;
        }
        else if(nextIdInt >= 10 && nextIdInt < 100){
            nextId = 'SD' + '0' + nextIdInt;
        }
        else{
            nextId = 'SD' + nextIdInt;
        }
    }
    else {
        nextId = "SD001";
    }


    try {
        const stadium = await models.SanDau.create(
            {
                MaSD: nextId,
                DiaChi: stadiumAddress,
            }
        );
        return stadium;
    } catch (error) {
        return false;
    }
}

