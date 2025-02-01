"use client";

import { seriesApi } from '@/services/api';
import { Serie } from '@/types/serie';
import Image from 'next/image';

interface MovieDetailProps {
  params: { id: string };
}

export default async function SerieDetail({ params }: MovieDetailProps) {
const id = params.id;
 const serie: Serie = await seriesApi.getSeriesById(Number(id));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px]">
        {/* Background Image */}
        <Image
          src={serie.backdropUrl || serie.posterUrl}
          alt={`Backdrop for ${serie.name}`}
          fill
          priority
          className="object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Movie Info */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24">
          <h1 className="text-4xl md:text-5xl font-bold max-w-2xl">{serie.name}</h1>
          
          <div className="flex items-center gap-3 mt-4 text-lg">
            <span>{serie.releaseDate}</span>
            <span>•</span>
            <span>{serie.runtime} min</span>
            <span>•</span>
            <span>{serie.genres.join(', ')}</span>
          </div>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-2 mt-2 text-yellow-400 text-lg">
            ⭐ {serie.rating}/10
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
        <p className="text-lg max-w-3xl">{serie.overview}</p>
      </div>
    </div>
  );
}
