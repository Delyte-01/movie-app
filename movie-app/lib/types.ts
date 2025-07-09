
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[]; // optional
  popularity?: number; // optional
  original_language?: string;
  original_title?: string;
  adult?: boolean;
  video?: boolean;
  genres: { id: number; name: string }[]; // optional
  [key: string]: any;
}