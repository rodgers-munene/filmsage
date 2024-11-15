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
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=53`, {
        params: { api_key: process.env.TMDB_API_KEY}

    });
    return response.data.results;

}

async function saveMoviesToDb(movies) {
    const connection = createConnection

    for (const movie of movies) {
    const {id, title, release_date, overview, vote_average, media_type, poster_path, backdrop_path, genre_ids} = movie;
    const genre_id = genre_ids && genre_ids.length > 0 ? genre_ids[0] : null;

    const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const backdropUrl = backdrop_path? `https://image.tmdb.org/t/p/w1280${backdrop_path}`: `https://image.tmdb.org/t/p/w1280${poster_path}`
    const posterPath = path.join(__dirname, '../public/images/thriller/poster', `${id}.jpg`);
    const backdropPath = path.join(__dirname, '../public/images/thriller/backdrop', `${id}.jpg`)

    // download and save the image
    await downloadImage(posterUrl, posterPath);
    await downloadImage(backdropUrl, backdropPath)

    // insert movie data with path into the database
    const query =  `INSERT INTO thriller (id, title, release_date, overview, vote_average, media_type, image_path, backdrop_path, genre_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE title = VALUES(title), release_date = VALUES(release_date),
     overview = VALUES(overview), vote_average = VALUES(vote_average), media_type = VALUES(media_type), image_path = VALUES(image_path), backdrop_path = VALUES(backdrop_path), genre_id = VALUES(genre_id)`;

     connection.execute(query, [id, title, release_date, overview, vote_average, media_type? media_type: null, posterPath, backdropPath, genre_id])
    }
    connection.end()
    
}

module.exports = {fetchMovies, saveMoviesToDb}