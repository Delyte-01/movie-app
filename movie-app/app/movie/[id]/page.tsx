import {
  fetchMovieDetails,
  fetchMovieCast,
  fetchSimilarMovies,
} from "@/lib/fetchmovies";
import { MovieDetails } from "@/component/movie-details";
import { CastSlider } from "@/component/cast";
import { MovieCarousel } from "@/component/movie-carousel";
import { Metadata } from "next";


export default async function MoviePage({ params }: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  if (!id) return <div>Movie Show not found</div>;
  const movie = await fetchMovieDetails(id);
  const cast = await fetchMovieCast(id);
  const similarMovies = await fetchSimilarMovies(id);

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
        <MovieCarousel
          title="Similar Movies"
          movies={similarMovies?.results || []}
          mediaType="movie"
        />
      </div>
    </div>
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const movie = await fetchMovieDetails(id);

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
