const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.findAllMatch = async() => {
    return await models.TranDau.findAll({
        raw: true,
    });
}