
const StadiumService = require('../services/StadiumService');
const TournamentService = require("../services/TournamentService");

class StadiumController {
    showStadiumList = async (req, res, next) => {

        const data = req.query;

        const filter = {};

        const page = parseInt(data.page) || 1;
        const limit = parseInt(data.limit) || 10;

        const allStadiumss = await StadiumService.findAllStadiumsAndCount(filter, page, limit);
        const stadiums = allStadiumss.rows;
        const count = allStadiumss.count;

        const pagination = {
            page: page,
            limit: limit,
            totalRows: count
        }

        res.render('stadium/stadiumList', {
            title: 'stadiums',
            pagination, stadiums, filter
        });
    }

    addStadium = async(req, res, next) => {

        const {stadiumAddress} = req.query;
        const stadium = await StadiumService.addStadium(stadiumAddress);

        res.redirect('/stadium');
    }
}

module.exports = new StadiumController;