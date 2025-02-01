"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Serie } from '@/types/serie';

interface SerieCardProps {
  serie: Serie;
}

export default function SerieCard({ serie }: SerieCardProps) {
  const altText = `Poster for the movie "${serie.name}" released on ${serie.releaseDate}`;

  return (
    <Link href={`/series/${serie.id}`} passHref>
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer">
        <Image
          src={serie.posterUrl}
          alt={altText}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          priority={false}
          aria-hidden={false}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-hidden="true"
        >
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold truncate">{serie.name}</h3>
            <p className="text-gray-200 text-sm">{serie.releaseDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}