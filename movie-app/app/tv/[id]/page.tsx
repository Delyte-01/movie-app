import {
  fetchTVDetails,
  fetchTVCast,
  fetchSimilarTVShows,
} from "@/lib/fetchtv";
import { MovieDetails } from "@/component/movie-details";
import { CastSlider } from "@/component/cast";
import { MovieCarousel } from "@/component/movie-carousel";
import { Metadata } from "next";


export default async function TvPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await  params;
  if (!id) return <div>TV Show not found</div>;
  const tv = await fetchTVDetails(id);
  const cast = await fetchTVCast(id);
  const similarTVShows = await fetchSimilarTVShows(id);

  if (!tv) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load TV show.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <MovieDetails {...tv} />
      <div className="container px-4 space-y-12">
        {cast?.length > 0 && <CastSlider cast={cast} />}
        <MovieCarousel
          title="Similar TV Shows"
          movies={similarTVShows?.results || []}
          mediaType="tv"
        />
      </div>
    </div>
  );
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tv = await fetchTVDetails(id);

  return {
    title:tv?.name || tv?.title || "Movie Details",
    description:tv?.overview || "Watch and explore movie information.",
    openGraph: {
      title: tv?.name || "Movie Details",
      description: tv?.overview || "",
      images: tv?.backdrop_path
        ? [`https://image.tmdb.org/t/p/w780${tv.backdrop_path}`]
        : [],
    },
  };
}
