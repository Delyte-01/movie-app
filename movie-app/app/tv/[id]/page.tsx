import {
  fetchTVDetails,
  fetchTVCast,
  fetchSimilarTVShows,
} from "@/lib/fetchtv";
import { MovieDetails } from "@/component/movie-details";
import { CastSlider } from "@/component/cast";
import { MovieCarousel } from "@/component/movie-carousel";


export default async function TvPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await  params;
  if (!id) return <div>TV Show not found</div>;
  // Fetch TV show details, cast, and similar shows
  const tv = await fetchTVDetails(id);
  const cast = await fetchTVCast(id);
  const similar = await fetchSimilarTVShows(id);

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
        <MovieCarousel title="Similar TV Shows" movies={similar} />
      </div>
    </div>
  );
}
