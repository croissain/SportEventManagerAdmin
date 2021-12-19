const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');

exports.findAllAdmin = async() => {
    return await models.Admin.findAll({
        raw: true,
    });
}

exports.findUserByEmail = async(email) => {
    return await models.Admin.findOne({
        raw: true,
        where: {
            Email: email
        }
    });
}