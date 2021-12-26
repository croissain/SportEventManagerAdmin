const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const TeamService = require('./TeamService')
const MatchService = require('../services/MatchService');



exports.findAllTournaments = async() => {
    return await models.GiaiDau.findAll({
        raw: true
    });
}

exports.findAllTournamentsAndCount = async(filter, page, limit) => {

    let options = {
        offset: (page - 1) * limit,
        limit: limit,
        order: [
            ['MaGD', 'ASC'],
        ],
        where: {
        },
        raw: true
    }

    if(filter.tournamentId){
        options.where.MaGD = filter.tournamentId;
    }

    if(filter.tournamentName){
        options.where.TenGD = filter.tournamentName;
    }

    try{
        const tournaments = await models.GiaiDau.findAndCountAll(options);
        return tournaments;
    }catch (e){
        return false;
    }

}

exports.findAllTournamentNames = async() => {
    return await models.GiaiDau.findAll({
        raw: true,
        attributes: [
            "TenGD"
        ]
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

exports.deleteTournamentByIds = async(ids) => {
    const teamIds = await TeamService.findAllTeamIdsByTournamentId(ids);

    await MatchService.deleteAllMatchByTeamIds(teamIds);
    await TeamService.deleteAllTeamByTournamentId(ids);

    const tournament = await this.findTournamentById(ids);
    tournament.destroy({
        where: {
            MaGD: ids
        }
    })
}

