const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');

exports.findAllAdmin = async() => {
    return await models.NhanVien.findAll({
        raw: true,
    });
}

exports.findUserByEmail = async(email) => {
    return await models.NhanVien.findOne({
        raw: true,
        where: {
            EmailNV: email
        }
    });
}

exports.findAdminByEmail = async(email) => {
    return await models.NhanVien.findOne({
        raw: true,
        where: {
            EmailNV: email
        }
    });
}
