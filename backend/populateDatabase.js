// backend/populateDatabase.js
const { fetchMovies, saveMoviesToDb } = require('./services/tmdbService');

async function populateDatabase() {
    console.log('Fetching movies from TMDb API...');
    const movies = await fetchMovies();
    console.log(`Fetched ${movies.length} movies. Saving to database...`);
    await saveMoviesToDb(movies);
    console.log('Movies have been saved to the database.');
}

populateDatabase().catch(error => console.error('Error populating database:', error));
