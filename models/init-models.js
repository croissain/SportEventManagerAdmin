var DataTypes = require("sequelize").DataTypes;
var _BanThang = require("./BanThang");
var _BangDau = require("./BangDau");
var _CauThu = require("./CauThu");
var _ChiTietTD = require("./ChiTietTD");
var _DoiBong = require("./DoiBong");
var _GiaiDau = require("./GiaiDau");
var _NguoiDangKy = require("./NguoiDangKy");
var _SanDau = require("./SanDau");
var _TranDau = require("./TranDau");
var _VongDau = require("./VongDau");

function initModels(sequelize) {
  var BanThang = _BanThang(sequelize, DataTypes);
  var BangDau = _BangDau(sequelize, DataTypes);
  var CauThu = _CauThu(sequelize, DataTypes);
  var ChiTietTD = _ChiTietTD(sequelize, DataTypes);
  var DoiBong = _DoiBong(sequelize, DataTypes);
  var GiaiDau = _GiaiDau(sequelize, DataTypes);
  var NguoiDangKy = _NguoiDangKy(sequelize, DataTypes);
  var SanDau = _SanDau(sequelize, DataTypes);
  var TranDau = _TranDau(sequelize, DataTypes);
  var VongDau = _VongDau(sequelize, DataTypes);

  DoiBong.belongsTo(BangDau, { as: "MaBD_BangDau", foreignKey: "MaBD"});
  BangDau.hasMany(DoiBong, { as: "DoiBongs", foreignKey: "MaBD"});
  BanThang.belongsTo(CauThu, { as: "MaCT_CauThu", foreignKey: "MaCT"});
  CauThu.hasMany(BanThang, { as: "BanThangs", foreignKey: "MaCT"});
  CauThu.belongsTo(DoiBong, { as: "MaDB_DoiBong", foreignKey: "MaDB"});
  DoiBong.hasMany(CauThu, { as: "CauThus", foreignKey: "MaDB"});
  TranDau.belongsTo(DoiBong, { as: "MaDB1_DoiBong", foreignKey: "MaDB1"});
  DoiBong.hasMany(TranDau, { as: "TranDaus", foreignKey: "MaDB1"});
  TranDau.belongsTo(DoiBong, { as: "MaDB2_DoiBong", foreignKey: "MaDB2"});
  DoiBong.hasMany(TranDau, { as: "MaDB2_TranDaus", foreignKey: "MaDB2"});
  TranDau.belongsTo(DoiBong, { as: "DoiThang_DoiBong", foreignKey: "DoiThang"});
  DoiBong.hasMany(TranDau, { as: "DoiThang_TranDaus", foreignKey: "DoiThang"});
  DoiBong.belongsTo(GiaiDau, { as: "MaGD_GiaiDau", foreignKey: "MaGD"});
  GiaiDau.hasMany(DoiBong, { as: "DoiBongs", foreignKey: "MaGD"});
  DoiBong.belongsTo(NguoiDangKy, { as: "MaNDK_NguoiDangKy", foreignKey: "MaNDK"});
  NguoiDangKy.hasMany(DoiBong, { as: "DoiBongs", foreignKey: "MaNDK"});
  TranDau.belongsTo(SanDau, { as: "MaSD_SanDau", foreignKey: "MaSD"});
  SanDau.hasMany(TranDau, { as: "TranDaus", foreignKey: "MaSD"});
  BanThang.belongsTo(TranDau, { as: "MaTD_TranDau", foreignKey: "MaTD"});
  TranDau.hasMany(BanThang, { as: "BanThangs", foreignKey: "MaTD"});
  ChiTietTD.belongsTo(TranDau, { as: "MaTD_TranDau", foreignKey: "MaTD"});
  TranDau.hasMany(ChiTietTD, { as: "ChiTietTDs", foreignKey: "MaTD"});
  TranDau.belongsTo(VongDau, { as: "MaVD_VongDau", foreignKey: "MaVD"});
  VongDau.hasMany(TranDau, { as: "TranDaus", foreignKey: "MaVD"});

  return {
    BanThang,
    BangDau,
    CauThu,
    ChiTietTD,
    DoiBong,
    GiaiDau,
    NguoiDangKy,
    SanDau,
    TranDau,
    VongDau,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
