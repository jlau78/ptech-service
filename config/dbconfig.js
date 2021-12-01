module.exports = {
  host: 'localhost',
  port: '5432',
  user: "root",
  password: 'passw0rd',
  database: 'ptech',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

};