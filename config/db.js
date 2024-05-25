const mysql=require("mysql2");
const { Sequelize } = require('sequelize');
require('dotenv').config();

const host=process.env.sqlHost;
const user=process.env.sqlUser;
const password=process.env.sqlPassword;
const database=process.env.sqlDatabase;
const port=process.env.sqlPort;

// const con=mysql.createConnection({
//     host,
//     user,
//     password,
//     database,
//     port
// })

// con.connect((error)=>{
//     if(error)throw error;
//     console.log('sql database connected.');
// })


const connection = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    port
});

connection.authenticate()
    .then(() => console.log('Connected to MySQL database successfully'))
    .catch(error => console.log('Error connecting to database:', error));

module.exports = { connection };
