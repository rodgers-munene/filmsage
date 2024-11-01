// Genres

//Action & adventure 
export async function fetchAction() {
   try {
      let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=28`)
      
      let data = await response.json()
      return data

   } catch (error) {
      console.log("There is a problem fetching the data", error)
   }
}

//Comedy
export async function fetchComedy(){
   try {
      let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=35`)

      let data = await response.json()
      return data;
   } catch (error) {
      console.error("There is a problem fetching the data", error) 
   }
}

// Drama
export async function fetchDrama(){
   try {
      let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=18`)

      let data = await response.json()

      return data;
   } catch (error) {
      console.error("There is a problem fetching the data", error)
   }
}


// Thriller
export async function fetchThriller(){
   try {
      let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=53`)

      let data = await response.json()

      return data;
   } catch (error) {
      console.error("There is a problem fetching the data", error)
   }
}

// Romance 
export async function fetchRomance(){
   try {
      let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=10749`)

      let data = await response.json()

      return data;
   } catch (error) {
      console.error("There is a problem fetching the data", error)
   }
}

// Sci-fi
export async function fetchSciFi(){
   try {
      let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=878`)

      let data = await response.json()

      return data;
   } catch (error) {
      console.error("There is a problem fetching the data", error)
   }
}

// Trending
export async function fetchTrending() {
   try {
    let response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`)

    let data = await response.json()
    return data

   } catch (error) {
    console.error("There is a problem fetching the data", error)
   }
}

// family && animation

// Upcoming

// Top-rated

// New