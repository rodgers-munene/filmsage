// Genres

//Action & adventure 
export async function fetchAction() {
   try {
      let response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=ae068f4ef971b7e5066b4e6790067735&with_genres=28")
      
      let data = await response.json()
      return data

   } catch (error) {
      console.log("There is a problem fetching the data", error)
   }
}

//Comedy

// Drama

// Thriller

// Romance 

// Sci-fi

// family && animation

// Upcoming

// Trending
export async function fetchTrending() {
   try {
    let response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=ae068f4ef971b7e5066b4e6790067735")

    let data = await response.json()
    return data

   } catch (error) {
    console.error("There is a problem fetching the data", error)
   }
}


// Top-rated

// New