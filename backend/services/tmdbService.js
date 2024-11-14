const axios = require('axios')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const createConnection = require('../db/connection');


// function to download and save an image locally
async function downloadImage(imageUrl, imagePath) {
    const response = await axios.get(imageUrl, {responseType: 'stream'});
    const writer = fs.createWriteStream(imagePath)
    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

async function fetchMovies() {
    const response = await axios.get(``)
}