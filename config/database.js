module.exports = {
    // HOST: "",
    // USER: "",
    // PASSWORD: "",
    // DB: "",
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "3003",
    DB: "SEM2612",
    SESSION_SECRET: "secret",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};