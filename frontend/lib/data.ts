// tmdb links
// action - https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=28
// comedy - 
// drama - 
// thriller - 
// romance - 
// trending - 


// Genres
export const Genres: { [key: number]: string }  = {
   28: "Action",
   12: "Adventure",
   16: "Animation",
   35: "Comedy",
   80: "Crime",
   99: "Documentary",
   18: "Drama",
   10751: "Family",
   14: "Fantasy",
   36: "History",
   27: "Horror",
   10402: "Music",
   9648: "Mystery",
   10749: "Romance",
   878: "Science Fiction",
   10770: "TV Movie",
   53: "Thriller",
   10752: "War",
   37: "Western"
}

// fetch all available genres

export async function fetchGenres( type: 'tv' | 'movie') {
   try {
      let response = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.TMDB_API_KEY}`)
      let data = await response.json() 
      return data
   } catch (error) {
      console.error("Error fetching genres")
   }
}

export async function fetchMoviesByGenre(genreIds: number[], type: 'tv' | 'movie') {
   try {
      const genreQuery = genreIds.join(",")
      let response = await fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.TMDB_API_KEY}&with_genres=${genreQuery}`)
      let data = await response.json()
      return data.results
   } catch (error) {
      console.error("Error Fetching data")
   }
}

export async function fetchMovieProviders(movieId: number,  type: 'tv' | 'movie') {
   try {
      let response  = await fetch(`https://api.themoviedb.org/3/${type}/${movieId}/watch/providers?api_key=${process.env.TMDB_API_KEY}`)
      let data = await response.json()
      return data.results.US || {}

   } catch (error) {
      console.error("Error fetching data", error)
   }
}

export async function fetchTrailers(movieId: number,  type: 'tv' | 'movie'){
   try {
      let response = await fetch(`https://api.themoviedb.org/3/${type}/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}`)
      let data = await response.json()
      return data.results
   } catch (error) {
      console.error("Error fetching Trailers", error)
   }
} 

export async function fetchSimilar(movieId: number,  type: 'tv' | 'movie'){
      // https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=1'
   try {
      let response = await fetch(`https://api.themoviedb.org/3/${type}/${movieId}/recommendations?api_key=${process.env.TMDB_API_KEY}`)
      let data = await response.json()
      return data.results.slice(0, 10);
   } catch (error) {
      
      console.error("Error fetching data", error)
   }
}

export async function fetchRecommendation(genreIds: number[],  type: 'tv' | 'movie'){
   try {
      const genres = genreIds.join(",")
      const today = new Date().toISOString().split("T")[0];
      let response = await fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.TMDB_API_KEY}&with_genres=${genres}&sort_by=popularity.desc`)
      let data = await response.json()
      return data.results.slice(0, 10);
   } catch (error) {
      console.error("Error fetching upcoming movies", error)
   }
}

export async function fetchCast(movieId: number, type: 'tv' | 'movie') {
   try {
      let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}`)
      let data = await response.json()
      return data.cast
   } catch (error) {
      console.error('Error fetching cast members', error)
   }

}

