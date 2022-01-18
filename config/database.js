module.exports = {
    HOST: "ec2-52-200-188-218.compute-1.amazonaws.com",
    USER: "ebyogwsrgblqcl",
    PASSWORD: "653441e3290e76dbb4f0373875a2cf0d6b2e429125d06fe07839e9248c20e63e",
    DB: "dafcp5c6j6t9df",
//     HOST: "localhost",
//     USER: "postgres",
//     PASSWORD: "1234",
//     DB: "SEM",
    SESSION_SECRET: "secret",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
