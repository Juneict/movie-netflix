import Image from 'next/image';
import { Play, Info } from 'lucide-react';
import Link from 'next/link';
import { moviesApi } from '@/services/api';

export default async function Hero() {
  const movie = await moviesApi.getFeatureMovie();
  
  return (
    <div className="relative h-[85vh] w-full">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-6 pb-24 md:px-12 lg:px-24">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {movie.title}
          </h1>
          <p>Top 1 in Movie Today</p>
          
          <p className="text-lg text-gray-200 line-clamp-3">
            {movie.overview}
          </p>

          <div className="flex gap-4 pt-4">
            <button className="flex items-center gap-2 px-8 py-2 bg-white text-black rounded hover:bg-opacity-90 transition">
              <Play size={24} />
              <span className="font-semibold">Play</span>
            </button>
            
            <Link href={`/movies/${movie.id}`} passHref>
              <button className="flex items-center gap-2 px-8 py-2 bg-gray-500 bg-opacity-50 text-white rounded hover:bg-opacity-40 transition">
                <Info size={24} />
                <span className="font-semibold">More Info</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}