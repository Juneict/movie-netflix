import { moviesApi } from '@/services/api';
import { Movie } from '@/types/movie';
import Image from 'next/image';
import { useState } from 'react';

interface MovieDetailProps {
  params: { id: string };
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const movie: Movie = await moviesApi.getMovieById(Number(params.id));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px]">
        {/* Background Image */}
        <Image
          src={movie.backdropUrl || movie.posterUrl}
          alt={`Backdrop for ${movie.title}`}
          fill
          priority
          className="object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Movie Info */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24">
          <h1 className="text-4xl md:text-5xl font-bold max-w-2xl">{movie.title}</h1>
          
          <div className="flex items-center gap-3 mt-4 text-lg">
            <span>{movie.releaseDate.split('-')[0]}</span>
            <span>•</span>
            <span>{movie.runtime} min</span>
            <span>•</span>
            <span>{movie.genres.join(', ')}</span>
          </div>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-2 mt-2 text-yellow-400 text-lg">
            ⭐ {movie.rating}/10
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-white text-black px-6 py-3 text-lg font-bold rounded-md flex items-center gap-2 hover:bg-gray-300">
              ▶ Play
            </button>
            <button className="bg-gray-700 px-6 py-3 text-lg font-bold rounded-md hover:bg-gray-600">
              + Add to List
            </button>
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="px-6 md:px-12 lg:px-24 py-8 space-y-6">
        {/* Overview */}
        <p className="text-lg max-w-3xl">{movie.overview}</p>
      </div>
    </div>
  );
}
