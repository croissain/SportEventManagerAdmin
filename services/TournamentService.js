const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.findAllTournaments = async() => {
    return await models.GiaiDau.findAll({
        raw: true
    });
}

exports.findTournamentById = async(id, raw = false) => {
    return await models.GiaiDau.findOne({
        raw: raw,
        where: {
            MaGD: id
        }
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


exports.editTournament = async (tournamentId, tournamentName, tournamentMinAge, tournamentMaxAge, tournamentNumberTeam) => {

    const tournament = await this.findTournamentById(tournamentId);

    tournamentName = tournamentName ||  tournament.TenGD;
    tournamentMinAge = tournamentMinAge ||  tournament.DoTuoiTGNhoNhat;
    tournamentMaxAge = tournamentMaxAge ||  tournament.DoTuoiTGLonNhat;
    tournamentNumberTeam = tournamentNumberTeam ||  tournament.SoDBThamGia;

    try {

        await tournament.update({
            TenGD: tournamentName,
            DoTuoiTGNhoNhat: tournamentMinAge,
            DoTuoiTGLonNhat: tournamentMaxAge,
            SoDBThamGia: tournamentNumberTeam
        })

        await tournament.save();
        return tournament;

    } catch (error) {
        return false;
    }
}

