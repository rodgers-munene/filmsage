const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db/connection')
const path = require('path')

// creating the express app and the port for communication
const app = express()
const PORT = 5000

// middleware
app.use(bodyParser.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'public/images')));


// start server

app.listen(PORT, () =>{
    console.log(`Server running on https://localhost:${PORT}`)
})

app.get('/action', (req, res) => {
    db.query('SELECT * FROM action', (err, results) =>{
        if(err) throw err;
        res.json(results)
    })
})
app.get('/trending', (req, res) => {
    db.query('SELECT * FROM trending', (err, results) =>{
        if(err) throw err;
        res.json(results)
    })
})
app.get('/comedy', (req, res) => {
    db.query('SELECT * FROM comedy', (err, results) =>{
        if(err) throw err;
        res.json(results)
    })
})
app.get('/drama', (req, res) => {
    db.query('SELECT * FROM drama', (err, results) =>{
        if(err) throw err;
        res.json(results)
    })
})
app.get('/romance', (req, res) => {
    db.query('SELECT * FROM romance', (err, results) =>{
        if(err) throw err;
        res.json(results)
    })
})
app.get('/scifi', (req, res) => {
    db.query('SELECT * FROM scifi', (err, results) =>{
        if(err) throw err;
        res.json(results)
    })
})
app.get('/thriller', (req, res) => {
    db.query('SELECT * FROM thriller', (err, results) =>{
        if(err) throw err;
        res.json(results)
    })
})