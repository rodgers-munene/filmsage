import DetailsCard from "@/components/movie-details-section/detailsCard";

interface Language{
    english_name: string
}

interface Genre {
    id: number
    name: string
}

interface TvShow{
    id: number
    name: string
    title: string
    runtime: number
    release_date: string
    overview: string
    poster_path: string
    backdrop_path:string
    first_air_date: string
    vote_average: number
    genres: Genre[]
    episode_run_time: number[]
    vote_count: number
    spoken_languages: Language[]
}

async function fetchTvShow(id: string): Promise<TvShow> {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`,{ 
        next:  {revalidate: 60},
    })

    
    if(!res.ok) throw new Error("Failed to fetch tv show data")
    return res.json();
}

export default async function TvShowDetails({ params }: { params: { id: string } } ){
    const tvShowData= await fetchTvShow(params.id)
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    
     if(!tvShowData) {return( 
     <div>Loading</div>
    )}
    
     return(
          <div className="">
              <div>
                 <DetailsCard  movieData={tvShowData} show_type='tv'/>
              </div>
          </div>
     )
}

