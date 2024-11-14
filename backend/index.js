const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db/connection')

// creating the express app and the port for communication
const app = express()
const PORT = 5000

// middleware
app.use(bodyParser.json())
app.use(cors())

// start server

app.listen(PORT, () =>{
    console.log(`Server running on https://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) =>{
        if(err) throw err;
        res.json(results)
    })
})