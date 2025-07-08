import { fetchMovieDetails, fetchMovieCast } from "@/lib/fetchmovies";
import { MovieDetails } from "@/component/movie-details";
import { CastSlider } from "@/component/cast";
;



export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await fetchMovieDetails(params.id);
  const cast = await fetchMovieCast(params.id);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load movie details.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Movie Info Section */}
      <MovieDetails {...movie} />

      {/* Cast Section */}
      <div className="container px-4 space-y-12">
        {cast?.length > 0 && <CastSlider cast={cast} />}
        {/* Future: <MovieCarousel title="Similar Movies" movies={similarMovies} /> */}
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}){
  const movie = await fetchMovieDetails(params.id);

  return {
    title: movie?.title || "Movie Details",
    description: movie?.overview || "Watch and explore movie information.",
    openGraph: {
      title: movie?.title || "Movie Details",
      description: movie?.overview || "",
      images: movie?.backdrop_path
        ? [`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`]
        : [],
    },
  };
}
