const mysql = require('mysql2')
require('dotenv').config()

const createConnection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })


createConnection.connect(err => {
    if(err){
        console.log("Connection to the database failed", err);      
    }else{
        console.log("Database connection successful");
    }
})

module.exports = createConnection;