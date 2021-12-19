const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.findAllTournaments = async() => {
    return await models.GiaiDau.findAll({
        raw: true,
    });
}

exports.findTournamentByName = async(name) => {
    return await models.GiaiDau.findOne({
        raw: true,
        where: {
            TenGD: name
        }
    });
}


exports.addTournament = async (tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam) => {
    const maxId = await models.GiaiDau.max('MaGD');
    const idNumber = maxId.substring(2, 4);
    const nextIdNumber = parseInt(idNumber) + 1;
    let nextId = "GD";
    if (nextIdNumber < 10) {
        nextId += '0' + nextIdNumber;
    } else if (nextIdNumber >= 10 && nextIdNumber < 100) {
        nextId += nextIdNumber;
    }

    try {
        const tournament = await models.GiaiDau.create(
            {
                MaGD: nextId,
                TenGD: tournamentName,
                DoTuoiTGNhoNhat: tournamentMinAge,
                DoTuoiTGLonNhat: tournamentMaxAge,
                SoDBThamGia: tournamentNumberTeam,
            }
        );
        return tournament;
    } catch (error) {
        return false;
    }
}