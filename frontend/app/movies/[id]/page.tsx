import { Metadata } from "next";
import Image from "next/image";
import DetailsCard from "@/components/detailsCard";

interface Movie{
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path: string
}

interface MovieDetailsParams {
    movieData: Movie;
}

async function fetchMovie(id: string): Promise<Movie> {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,{ 
        next:  {revalidate: 60},
    })

    
    if(!res.ok) throw new Error("Failed to fetch movie data")
    return res.json();
}


export default async function MovieDetails({ params }: { params: { id: string } } ){
   const movieData= await fetchMovie(params.id)
   const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    if(!movieData) {return( 
    <div>Loading</div>
)}

    return(
        <div className="relative w-full h-[90vh] flex justify-center items-center">
           <div>
                <DetailsCard  movieData={movieData}/>
           </div>
        </div>
    )
}

// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//     const movie = await fetchMovie(params.id)
    
//     return{
//         title: movie.title,
//         description: movie.overview
//     };
// }
