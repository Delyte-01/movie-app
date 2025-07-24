import React from 'react'

interface TrailerProps {
  trailerKey: string;
}

function Trailer({trailerKey}: TrailerProps) {
  return (
    <section className="container px-4 md:px-20 lg:px-30 mt-12">
      <h2 className="text-xl font-semibold mb-4">Watch Trailer</h2>
      <div className="aspect-video w-full rounded-md overflow-hidden shadow-lg border border-white/10">
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </section>
  );
}

export default Trailer