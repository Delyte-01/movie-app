// "use client";

// import { useMovieContext } from "@/hooks/use-context";



// export default function HomePage() {
//   const { topRated } = useMovieContext();

//   return (
//     <main className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Top Rated Movies</h1>
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         {topRated.map((movie: any) => (
//           <div key={movie.id} className="bg-gray-800 p-3 rounded shadow">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="rounded"
//             />
//             <h2 className="mt-2 text-sm font-semibold">{movie.title}</h2>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
