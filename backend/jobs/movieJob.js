const cron = require('node-cron')
const { fetchMovies, saveMoviesToDb } = require('../services/tmdbService')

cron.schedule('0 0 * * *', async () => {
    console.log('Fetching movies from TMDb API...');
    const movies = await fetchMovies();
    await saveMoviesToDB(movies);
    console.log('Movies saved to local MySQL database.');
});