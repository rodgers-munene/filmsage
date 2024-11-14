const axios = require('axios')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const createConnection = require('../db/connection');
const { release } = require('process');


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
    const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
        params: { api_key: process.env.TMDB_API_KEY}

    });
    return response.data.results;

}

async function saveMoviesToDb(movies) {
    const connection = await createConnection()

    for (const movie of movies) {
    const {id, title, release_date, overview, vote_average, poster_path, backdrop_path} = movie;
    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const imagePath = path.join(__dirname, '../public/images', `${id}.jpg`);

    // download and save the image
    await downloadImage(imageUrl, imagePath);

    // insert movie data with path into the database
    const query =  `INSERT INTO movies (id, title, release_date, overview, vote_average, poster_path, backdrop_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE title = VALUES(title), release_date = VALUES(release_date),
     overview = VALUES(overview), vote_average = VALUES(vote_average), poster_path = VALUES(poster_path), backdrop_path = VALUES(backdrop_path)`;

     await connection.execute(query, [id, title, release_date,overview, vote_average, imagePath, backdrop_path])
    }
    await connection.end()
    
}

module.exports = {fetchMovies, saveMoviesToDb}